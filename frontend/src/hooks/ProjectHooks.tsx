import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorMessage } from "../lib/utils/error";
import { axiosInstance, IProjectFormData } from "../lib/types/types";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/project/all`);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      try {
        const res = await axiosInstance.delete(`/project/delete/${_id}`);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.setQueryData(["projects"], data);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

export const useEditProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (editedProject: IProjectFormData) => {
      try {
        const res = await axiosInstance.put(`/project/edit/${editedProject._id}`, editedProject);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.setQueryData(["projects"], data);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

export const useAddProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (addedProject: IProjectFormData) => {
      try {
        const res = await axiosInstance.post(`/project/add`, addedProject);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.setQueryData(["projects"], data);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
