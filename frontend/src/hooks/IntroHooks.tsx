import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorMessage } from "../lib/utils/error";
import { API_URL } from "../lib/types/types";

export const useGetIntro = () => {
  return useQuery({
    queryKey: ["intro"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/intro`);
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
        const res = await axios.put(`${API_URL}/intro/edit`, formData);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["intro"] });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
