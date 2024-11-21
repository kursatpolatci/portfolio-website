import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { errorMessage } from "../utils/error";
import { API_URL } from "../utils/types";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/project/all`);
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
