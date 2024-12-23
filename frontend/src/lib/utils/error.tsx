import { AxiosError } from 'axios';

const errorResponse = (error: unknown): string => {
  if (error instanceof AxiosError) return error.response?.data.message;
  else if (error instanceof Error) return error.message;
  else return 'An unknown error occurred';
};

const errorMessage = (error: unknown): void => {
  if (typeof error === 'string') console.error(`Error: `, error);
  else console.error(`Unexpected error: `, error);
};

export { errorResponse, errorMessage };
