import axios from "axios";
import { map } from "lodash";

const { VITE_MAIN_API_URL: API_URL } = import.meta.env;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (url: string, params = {}) => {
  const requestQuery = map(params, (value:string, key:string) => `${key}=${value.toString()}`).join("&");
  const response = await api.get(`${url}?${requestQuery}`);
  return response.data;
};

export const post = async (url: string, data = {}) => {
  const response = await api.post(url, data);
  return response.data;
};

export const put = async (url: string, data = {}) => {
  const response = await api.put(url, data);
  return response.data;
};

export const del = async (url: string) => {
  const response = await api.delete(url);
  return response.data;
};

export const endpoints = {
  schedules: "/v1/schedules/",
};
