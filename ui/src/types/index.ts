export type Schedule = {
  id: number;
  title: string;
  description: string;
  date: Date;
  [key: string]: number | string | Date;
};
