import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorMessage } from "../utils/error";
import { API_URL} from "../utils/types";
import toast from "react-hot-toast";

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
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    refetchInterval: false,
  });
};

export const useEditIntro = () => {
  const queryClient = useQueryClient()
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
      queryClient.invalidateQueries({queryKey: ["intro"]})
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
