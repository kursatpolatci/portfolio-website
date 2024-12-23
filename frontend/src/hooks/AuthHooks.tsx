import toast from 'react-hot-toast';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { axiosInstance } from '../lib/types/definations';
import { errorResponse } from '../lib/utils/error';
import { IDefaultResponse, IErrorResponse } from '../lib/types/response';
import { ILoginFormData } from '../lib/types/formdata';

export const useLogin = (): UseMutationResult<IDefaultResponse, IErrorResponse, ILoginFormData> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: ILoginFormData): Promise<IDefaultResponse> => {
      try {
        const res = await axiosInstance.post(`/auth/login`, formData);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    onSuccess: async (data: IDefaultResponse) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error: IErrorResponse) => {
      toast.error(error);
    },
  });
};

export const useLogout = (): UseMutationResult<IDefaultResponse, IErrorResponse, void> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<IDefaultResponse> => {
      try {
        const res = await axiosInstance.post(`/auth/logout`);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    onSuccess: (data: IDefaultResponse) => {
      toast.success(data.message);
      queryClient.setQueryData(['authUser'], null);
    },
    onError: (error: IErrorResponse) => {
      toast.error(error);
    },
  });
};

export const useCheckAuth = (): UseQueryResult<IDefaultResponse, IErrorResponse> => {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: async (): Promise<IDefaultResponse> => {
      try {
        const res = await axiosInstance.get(`/auth/me`);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    retry: false,
  });
};
