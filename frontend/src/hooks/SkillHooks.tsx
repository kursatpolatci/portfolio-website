import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorMessage } from "../lib/utils/error";
import { axiosInstance, ISkillFormData } from "../lib/types/types";

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/skill/all`);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      try {
        const res = await axiosInstance.delete(`/skill/delete/${_id}`);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.setQueryData(["skills"], data);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

export const useEditSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (editedData: ISkillFormData) => {
      try {
        const res = await axiosInstance.put(`/skill/edit/${editedData._id}`, editedData);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.setQueryData(["skills"], data);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

export const useAddSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (addedData: ISkillFormData) => {
      try {
        const res = await axiosInstance.post(`/skill/add`, addedData);
        return res.data;
      } catch (error: unknown) {
        throw errorMessage(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.setQueryData(["skills"], data);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
