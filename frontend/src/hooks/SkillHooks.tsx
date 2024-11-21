import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { errorMessage } from "../utils/error";
import { API_URL } from "../utils/types";

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/skill/all`);
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
