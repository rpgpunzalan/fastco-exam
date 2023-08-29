export type Schedule = {
  _id: string;
  title: string;
  description: string;
  date: Date;
  [key: string]: number | string | Date;
};
