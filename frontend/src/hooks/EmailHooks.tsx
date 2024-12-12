import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { errorMessage } from "../lib/utils/error";
import { API_URL, IEmailData } from "../lib/types/types";

export const useSendEmail = () => {
  return useMutation({
    mutationFn: async (formData: IEmailData) => {
      try {
        const res = await axios.post(`${API_URL}/contact`, formData);
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
