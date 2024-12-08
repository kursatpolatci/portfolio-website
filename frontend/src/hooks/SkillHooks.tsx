import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorMessage } from "../utils/error";
import { API_URL, IEditSkillData } from "../utils/types";
import toast from "react-hot-toast";

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

export const useDeleteSkill = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await axios.delete(`${API_URL}/skill/delete/${id}`)
        return res.data
      } catch (error: unknown) {
        throw errorMessage(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({queryKey:["skills"]})
    },
    onError: (error: string) => {
      toast.error(error)
    }
  })
}

export const useEditSkill = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (editedData: IEditSkillData) => {
      try {
        const res = await axios.put(`${API_URL}/skill/edit/${editedData._id}`, editedData)
        return res.data
      } catch (error: unknown) {
        throw errorMessage(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({queryKey:["skills"]})
    },
    onError: (error: string) => {
      toast.error(error)
    }
  })
}