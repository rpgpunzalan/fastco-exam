import Calendar from "./components/schedule/Calendar";
import ScheduleItem from "./components/schedule/ScheduleItem";
import { Schedule } from "./types";
import AddSchedule from "./components/schedule/AddSchedule";
import { useEffect, useState } from "react";
import { endpoints, get } from "./api";

function App() {
  const [events, setEvents] = useState<Schedule[]>([]);

  const refreshEvents = () => {
    get(endpoints.schedules).then((response: Schedule[]) => {
      setEvents(response);
    });
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  return (
    <div className=" min-h-screen flex flex-col gap-4 p-10">
      <div className="flex flex-col bg-white rounded-md shadow-lg p-10 grow">
        <div className="flex flex-row h-full gap-5">
          <div className="flex flex-col w-[20%] border rounded-lg h-full">
            <span className="p-4 bg-gray-secondary font-bold">Scheduled Appointments</span>
            <div className="flex flex-col overflow-auto max-h-[55vh]">
              {events.map((item, idx) => (
                <ScheduleItem key={idx} event={item} refreshEvents={refreshEvents} />
              ))}
            </div>
            <AddSchedule setEvents={setEvents} />
          </div>
          <div className="flex flex-col grow p-4 h-full rounded shadow-lg border">
            <Calendar events={events} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
