import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../utils/Definations";

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/skill/all`);
        return res.data;
      } catch (err) {
        throw new Error(`ATTENTION: ${err}`);
      }
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    refetchInterval: false,
  });
};
