import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../lib/types/types";
import { errorMessage } from "../lib/utils/error";
import toast from "react-hot-toast";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      try {
        const res = await axios.post(`${API_URL}/auth/login`, data);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.post(`${API_URL}/auth/logout`);
        return res.data;
      } catch (error) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
