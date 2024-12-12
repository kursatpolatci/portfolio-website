import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../lib/types/types";
import { errorMessage } from "../lib/utils/error";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: { username: string; password: string }) => {
      try {
        const res = await axios.post(`${API_URL}/auth/login`, formData);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.post(`${API_URL}/auth/logout`);
        return res.data;
      } catch (error) {
        throw errorMessage(error);
      }
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      queryClient.setQueryData(["authUser"], null);
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/check-auth`);
        return res.data;
      } catch (error) {
        throw errorMessage(error);
      }
    },
    retry: false
  });
};
