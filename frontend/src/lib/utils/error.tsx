import { AxiosError } from "axios";

const errorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) return error.response?.data.message;
  else if (error instanceof Error) return error.message;
  else return "An unknown error occurred";
};

export { errorMessage };
