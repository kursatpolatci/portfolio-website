import { IconType } from "react-icons";

export const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

export const BACKEND_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : window.location.origin;

export interface IEmailForm {
  name: string;
  email: string;
  message: string;
}

export interface IIcons {
  Icon: IconType;
  to: string;
}

export interface ILinks {
  to: string;
  name: string;
}

export interface IGroup {
  category: string;
  projects: {
    _id: string;
    title: string;
    description: string;
    img: string;
    tags: string[] | null;
    link: string;
  }[];
}

export interface ISkill {
    _id: string,
    name: string,
    img: string,
    colorInvert: boolean
}

export interface IEditFormData {
  name: string | null;
  bio: string | null;
  image: File | null;
  resume: File | null;
}