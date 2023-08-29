import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { Schedule } from "../../types";
import { post, endpoints } from "../../api";

type Props = {
  refreshEvents?: () => void;
  setEvents: React.Dispatch<React.SetStateAction<Schedule[]>>;
};
const AddSchedule = ({ setEvents }: Props) => {
  const scheduleInitialState = {
    title: "",
    description: "",
    date: new Date(),
  } as Schedule;
  const [newSchedule, setNewSchedule] = useState<Schedule>(scheduleInitialState);
  const [errorMsg, setErrorMsg] = useState("");
  const register = (name: string) => {
    return {
      name,
      value: newSchedule[name],
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setNewSchedule({
          ...newSchedule,
          [name]: e.target.value,
        });
      },
    } as DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  };

  const handleAdd = async () => {
    try {
      const response = await post(endpoints.schedules, newSchedule);
      // Refresh events from DB
      // refreshEvents();

      // But I think it's better to just push the new event to the events array
      // for better performance and less network usage
      setEvents((events) => [...events, response]);
      setNewSchedule(scheduleInitialState);
      setErrorMsg("");
    } catch (error: unknown) {
      const { response } = error as { response: { data: { error: string } } };
      setErrorMsg(response.data.error);
    }
  };
  return (
    <div className="flex flex-col">
      <span className="p-4 bg-gray-secondary font-bold">Create new Event</span>
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
        <input type="date" {...register("date")} className="focus:outline-none border p-2 rounded-lg" />
        <button onClick={handleAdd} className="p-2 bg-blue-500 rounded-lg font-bold text-white">
          Add New Event
        </button>
      </div>
    </div>
  );
};

export default AddSchedule;
