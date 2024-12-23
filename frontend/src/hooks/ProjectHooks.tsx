import toast from 'react-hot-toast';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { errorResponse } from '../lib/utils/error';
import { axiosInstance } from '../lib/types/definations';
import { IPostProject, IDefaultResponse, IEditProject, IErrorResponse, IGetProjects } from '../lib/types/response';

export const useGetProjects = (): UseQueryResult<IGetProjects, IErrorResponse> => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<IGetProjects> => {
      try {
        const res = await axiosInstance.get(`/project/all`);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
  });
};

export const useDeleteProject = (): UseMutationResult<IDefaultResponse, IErrorResponse, string> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string): Promise<IDefaultResponse> => {
      try {
        const res = await axiosInstance.delete(`/project/delete/${_id}`);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    onSuccess: async (data: IDefaultResponse) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: IErrorResponse) => {
      toast.error(error);
    },
  });
};

export const useEditProject = (): UseMutationResult<IEditProject, IErrorResponse, FormData> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (editedProject: FormData): Promise<IEditProject> => {
      try {
        const res = await axiosInstance.put(`/project/edit/${editedProject.get('_id')}`, editedProject);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    onSuccess: async (data: IEditProject) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: IErrorResponse) => {
      toast.error(error);
    },
  });
};

export const useAddProject = (): UseMutationResult<IPostProject, IErrorResponse, FormData> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (addedProject: FormData): Promise<IPostProject> => {
      try {
        const res = await axiosInstance.post(`/project/add`, addedProject);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    onSuccess: async (data: IPostProject) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: IErrorResponse) => {
      toast.error(error);
    },
  });
};

export const useDeleteAllProjects = (): UseMutationResult<IDefaultResponse, IErrorResponse, void> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<IDefaultResponse> => {
      try {
        const res = await axiosInstance.delete(`/project/delete/all`);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
