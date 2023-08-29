export type Schedule = {
  _id: string;
  title: string;
  description: string;
  date: Date | null;
  [key: string]: number | string | Date | null;
};
