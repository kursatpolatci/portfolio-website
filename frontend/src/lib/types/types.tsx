import axios from "axios";
axios.defaults.withCredentials = true;
export const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";
export const BACKEND_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : window.location.origin;
export type dialogType = "edit" | "add";

export interface IEmailData {
  name: string;
  email: string;
  message: string;
}

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  img: string;
  tags: string[];
  link: string;
  category: string
}

export interface IProjects {
  category: string;
  projects: IProject[];
}

export interface ISkill {
  _id?: string;
  name: string;
  img: string;
  colorInvert: boolean;
}
