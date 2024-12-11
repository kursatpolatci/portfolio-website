import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorMessage } from "../lib/utils/error";
import { API_URL, IProject } from "../lib/types/types";
import toast from "react-hot-toast";

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

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      try {
        const res = await axios.delete(`${API_URL}/project/delete/${_id}`);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

export const useEditProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (editedProject: IProject) => {
      try {
        const res = await axios.put(`${API_URL}/project/edit/${editedProject._id}`, editedProject );
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

export const useAddProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (addedProject: IProject) => {
      try {
        const res = await axios.post(`${API_URL}/project/add`, addedProject);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
