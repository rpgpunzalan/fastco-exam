import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from "react";
import dayjs from "dayjs";

import { Schedule } from "../../types";
import { post, endpoints, put } from "../../api";
import { scheduleInitialState } from "../../constants/ScheduleInititalState";

type Props = {
  refreshEvents: () => void;
  setEvents: React.Dispatch<React.SetStateAction<Schedule[]>>;
  event: Schedule | null;
  setEditingEvent: React.Dispatch<React.SetStateAction<Schedule | null>>;
};
const AddSchedule = ({ setEvents, refreshEvents, event, setEditingEvent }: Props) => {
  const [newSchedule, setNewSchedule] = useState<Schedule>(scheduleInitialState);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const register = (name: string, type = "text") => {
    return {
      name,
      value: type === "date" ? dayjs(newSchedule[name]).format("YYYY-MM-DD") : newSchedule[name],
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchedule({
          ...newSchedule,
          [name]: e.target.value,
        });
      },
    } as DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  };

  const handleAdd = async () => {
    setIsLoading(true);
    try {
      const response = await post(endpoints.schedules, newSchedule);
      // Refresh events from DB
      // refreshEvents();

      // But I think it's better to just push the new event to the events array
      // for better performance and less network usage
      setEvents((events) => [...events, response].sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()));
      setNewSchedule(scheduleInitialState);
      setErrorMsg("");
    } catch (error: unknown) {
      const { response } = error as { response: { data: { error: string } } };
      setErrorMsg(response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    if (confirm("Are you sure you want to update this event?")) {
      try {
        await put(`${endpoints.schedules}/${event?._id}`, newSchedule);
        refreshEvents();
        setEditingEvent(null);
        setErrorMsg("");
      } catch (error: unknown) {
        const { response } = error as { response: { data: { error: string } } };
        setErrorMsg(response.data.error);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setNewSchedule(event || scheduleInitialState);
  }, [event]);

  return (
    <div className="flex flex-col">
      <span className="p-4 bg-gray-secondary font-bold">{event ? "Update Event" : "Create new Event"}</span>
      <div className="flex flex-col p-4 gap-2">
        {errorMsg && <span className="text-red-500 font-bold">{errorMsg}</span>}
        <input
          className="focus:outline-none border p-2 rounded-lg"
          type="text"
          placeholder="Title"
          {...register("title")}
        />
        <input
          className="focus:outline-none border p-2 rounded-lg"
          placeholder="Description"
          {...register("description")}
        />
        <input type="date" {...register("date", "date")} className="focus:outline-none border p-2 rounded-lg" />
        <button
          disabled={isLoading}
          onClick={event ? handleUpdate : handleAdd}
          className="p-2 bg-blue-500 rounded-lg font-bold text-white"
        >
          {event ? "Update Event" : "Add New Event"}
        </button>
        {event && (
          <button
            disabled={isLoading}
            onClick={() => {
              setEditingEvent(null);
            }}
            className="p-2 bg-red-500 rounded-lg font-bold text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default AddSchedule;
