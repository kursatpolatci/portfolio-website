import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { errorMessage } from "../lib/utils/error";
import { API_URL, IEmailData } from "../lib/types/types";

export const useSendEmail = () => {
  return useMutation({
    mutationFn: async ({ name, email, message }: IEmailData) => {
      try {
        const res = await axios.post(`${API_URL}/contact`, { name, email, message });
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
