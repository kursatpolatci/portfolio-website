export type IErrorResponse = string;

export interface IDefaultResponse {
  success: boolean;
  message: string;
}

/* Intro */
export interface IIntro {
  _id: string;
  name: string;
  bio: string;
  image: string;
  resume: string;
}

export interface IGetIntro {
  success: boolean;
  intro: IIntro;
}

export interface IEditIntro {
  success: boolean;
  message: string;
  intro: IIntro;
}

/* Projects */
export interface IProject {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  category: string;
}

export interface IGetProjects {
  success: boolean;
  projects: {
    category: string;
    projects: IProject[];
  }[];
}

export interface IEditProject {
  success: boolean;
  message: string;
  project: IProject;
}

export interface IPostProject {
  success: boolean;
  message: string;
  projects: IProject;
}

/* Skills */
export interface ISkill {
  _id: string;
  name: string;
  image: string;
  colorInvert: boolean;
}

export interface IGetSkills {
  success: boolean;
  skills: ISkill[];
}

export interface IEditSkill {
  success: boolean;
  message: string;
  skill: ISkill;
}

export interface IPostIntro {
  success: boolean;
  message: string;
  skill: ISkill;
}
