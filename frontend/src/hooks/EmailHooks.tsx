import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL, IEmailData } from "../utils/Definations";

export const useSendEmail = () => {
  return useMutation({
    mutationFn: async ({ name, email, message }: IEmailData) => {
      try {
        const res = await axios.post(`${API_URL}/contact`, {
          name,
          email,
          message,
        });
        return res.data;
      } catch (err) {
        throw new Error(`ATTENTION: ${err}`);
      }
    },
  });
};
