export interface IIntroFormData {
  name: string;
  bio: string;
  image: File | null;
  resume: File | null;
}

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
  image: File | null;
  tags: string[];
  link: string;
  category: string;
}

export interface ISkillFormData {
  _id: string;
  name: string;
  image: File | null;
  colorInvert: boolean;
}
