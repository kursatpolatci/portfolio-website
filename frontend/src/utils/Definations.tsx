export const API_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

export const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : window.location.origin;

export interface ISkill {
  id: string;
  name: string;
  img: string;
  colorInvert: boolean;
}

export type ISkills = ISkill[];

export interface IProject {
  id: string;
  title: string;
  img: string;
  description: string;
  tags?: string[];
  link: string;
}

export interface IProjects {
  category: string,
  projects: IProject[]
}

export interface IEmailData {
  name: string;
  email: string;
  message: string;
}