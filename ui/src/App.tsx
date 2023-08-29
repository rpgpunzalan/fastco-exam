import Calendar from "./components/schedule/Calendar";
import ScheduleItem from "./components/schedule/ScheduleItem";
import { Schedule } from "./types";
import AddOrUpdateSchedule from "./components/schedule/AddOrUpdateSchedule";
import { ChangeEvent, useEffect, useState } from "react";
import { endpoints, get } from "./api";
import { Icon } from "@iconify/react";
import { useDebounce } from "usehooks-ts";

function App() {
  const [events, setEvents] = useState<Schedule[]>([]);
  const [editingEvent, setEditingEvent] = useState(null as Schedule | null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const refreshEvents = (q = "") => {
    get(endpoints.schedules, {
      q,
    }).then((response: Schedule[]) => {
      setEvents(response);
    });
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  useEffect(() => {
    refreshEvents(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className=" min-h-screen flex flex-col gap-4 p-10">
      <div className="flex flex-col bg-white rounded-md shadow-lg p-10 grow">
        <div className="flex flex-row h-full gap-5">
          <div className="flex flex-col w-[20%] border rounded-lg h-full">
            <span className="p-4 bg-gray-secondary font-bold">Scheduled Appointments</span>
            <div className="flex items-center gap-2 px-4 p-2 border-b">
              <Icon icon="bx:bx-search" className="w-5 h-5 text-gray-500" />
              <input onChange={handleSearchChange} type="text" className="w-full focus:outline-none" />
            </div>
            <div className="flex flex-col overflow-auto max-h-[55vh]">
              {events.map((item, idx) => (
                <ScheduleItem key={idx} event={item} refreshEvents={refreshEvents} setEditingEvent={setEditingEvent} />
              ))}
            </div>
            <AddOrUpdateSchedule
              setEvents={setEvents}
              refreshEvents={refreshEvents}
              event={editingEvent}
              setEditingEvent={setEditingEvent}
            />
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
