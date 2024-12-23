import toast from 'react-hot-toast';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { errorResponse } from '../lib/utils/error';
import { axiosInstance } from '../lib/types/definations';
import { IPostIntro, IDefaultResponse, IEditSkill, IErrorResponse, IGetSkills } from '../lib/types/response';

export const useGetSkills = (): UseQueryResult<IGetSkills, IErrorResponse> => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async (): Promise<IGetSkills> => {
      try {
        const res = await axiosInstance.get(`/skill/all`);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
  });
};

export const useDeleteSkill = (): UseMutationResult<IDefaultResponse, IErrorResponse, string> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string): Promise<IDefaultResponse> => {
      try {
        const res = await axiosInstance.delete(`/skill/delete/${_id}`);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    onSuccess: (data: IDefaultResponse) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
    onError: (error: IErrorResponse) => {
      toast.error(error);
    },
  });
};

export const useEditSkill = (): UseMutationResult<IEditSkill, IErrorResponse, FormData> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (editedData: FormData): Promise<IEditSkill> => {
      try {
        const res = await axiosInstance.put(`/skill/edit/${editedData.get('_id')}`, editedData);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    onSuccess: (data: IEditSkill) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
    onError: (error: IErrorResponse) => {
      toast.error(error);
    },
  });
};

export const useAddSkill = (): UseMutationResult<IPostIntro, IErrorResponse, FormData> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (addedData: FormData): Promise<IPostIntro> => {
      try {
        const res = await axiosInstance.post(`/skill/add`, addedData);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    onSuccess: (data: IPostIntro) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
    onError: (error: IErrorResponse) => {
      toast.error(error);
    },
  });
};

export const useDeleteAllSkills = (): UseMutationResult<IDefaultResponse, IErrorResponse, void> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<IDefaultResponse> => {
      try {
        const res = await axiosInstance.delete(`/skill/delete/all`);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
