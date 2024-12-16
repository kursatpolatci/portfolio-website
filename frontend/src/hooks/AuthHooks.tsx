import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance, ILoginFormData } from "../lib/types/types";
import { errorMessage } from "../lib/utils/error";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: ILoginFormData) => {
      try {
        const res = await axiosInstance.post(`/auth/login`, formData);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({queryKey: ["authUser"]});
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
        const res = await axiosInstance.post(`/auth/logout`);
        return res.data;
      } catch (error) {
        throw errorMessage(error);
      }
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      queryClient.setQueryData(["authUser"], null);
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
        const res = await axiosInstance.get(`/auth/check-auth`);
        return res.data;
      } catch (error) {
        throw errorMessage(error);
      }
    },
    retry: false,
  });
};
