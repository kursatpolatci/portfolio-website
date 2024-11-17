import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../utils/Definations";

export const useGetIntro = () => {
  return useQuery({
    queryKey: ["intro"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/intro`);
        return res.data;
      } catch (err) {
        throw new Error(`ATTENTION: ${err}`);
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    refetchInterval: false,
  });
};
