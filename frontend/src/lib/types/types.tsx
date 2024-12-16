import axios from "axios";

export const API_URL =
  import.meta.env.MODE === "development" ? `http://localhost:5000/api` : `${import.meta.env.VITE_BACKEND_URL}/api`;
export const uploads =
  import.meta.env.MODE === "development" ? `http://localhost:5000/uploads` : `${import.meta.env.VITE_BACKEND_URL}/uploads`;
export type dialogType = "edit" | "add";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export interface ILoginFormData {
  username: string;
  password: string;
}

export interface IEmailFormData {
  name: string;
  email: string;
  message: string;
}

export interface IProjectFormData {
  _id: string;
  title: string;
  description: string;
  img: string;
  tags: string[];
  link: string;
  category: string;
}

export interface IProjects {
  category: string;
  projects: IProjectFormData[];
}

export interface ISkillFormData {
  _id: string;
  name: string;
  img: string;
  colorInvert: boolean;
}
