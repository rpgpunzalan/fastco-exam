import { Schedule } from "../../types";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { del, endpoints } from "../../api";

type Props = {
  event: Schedule;
  refreshEvents: () => void;
};
const ScheduleItem = ({ event, refreshEvents }: Props) => {
  const handleDelete = async () => {
    // delete event from DB
    if (confirm("Are you sure you want to delete this event?")) {
      await del(`${endpoints.schedules}/${event._id}`);
      refreshEvents();
    }
  };
  return (
    <div className="flex justify-between border-b p-4 group hover:cursor-pointer hover:bg-slate-50">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 rounded-full" />
          <span className="font-semibold"> {event.title}</span>
        </div>
        <span className="text-xs text-gray-500">{event.description}</span>
        <span className="text-xs font-semibold">{dayjs(event.date).format("MMM DD, YYYY")}</span>
      </div>
      <div className="hidden items-center gap-2 group-hover:flex">
        <Icon icon="bx:bx-edit" className="w-5 h-5 text-gray-500 hover:text-gray-800 hover:cursor-pointer" />
        <Icon
          icon="bx:bx-trash"
          onClick={handleDelete}
          className="w-5 h-5 text-gray-500 hover:text-gray-800 hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ScheduleItem;
