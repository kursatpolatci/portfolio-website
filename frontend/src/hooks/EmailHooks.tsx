import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance, IEmailFormData } from "../lib/types/types";
import { errorMessage } from "../lib/utils/error";

export const useSendEmail = () => {
  return useMutation({
    mutationFn: async (formData: IEmailFormData) => {
      try {
        const res = await axiosInstance.post(`/contact`, formData);
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
