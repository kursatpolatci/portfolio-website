import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../utils/Definations";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/project/all`);
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
