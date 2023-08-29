import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Schedule } from "../../types";
import { EventInput } from "@fullcalendar/core/index.js";

type Props = {
  events: Schedule[];
};
const Calendar = ({ events }: Props) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      events={events as EventInput}
      initialView="dayGridMonth"
      viewClassNames={["h-full"]}
    />
  );
};

export default Calendar;
