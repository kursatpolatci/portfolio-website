import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/types/types";
import { errorMessage } from "../lib/utils/error";

export const useGetIntro = () => {
  return useQuery({
    queryKey: ["intro"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/intro`);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
  });
};

export const useEditIntro = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const res = await axiosInstance.put(`/intro/edit`, formData);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.setQueryData(["intro"], data);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
