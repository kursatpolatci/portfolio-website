import toast from 'react-hot-toast';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { axiosInstance } from '../lib/types/definations';
import { errorResponse } from '../lib/utils/error';
import { IEditIntro, IErrorResponse, IGetIntro } from '../lib/types/response';

export const useGetIntro = (): UseQueryResult<IGetIntro, IErrorResponse> => {
  return useQuery({
    queryKey: ['intro'],
    queryFn: async (): Promise<IGetIntro> => {
      try {
        const res = await axiosInstance.get(`/intro`);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
  });
};

export const useEditIntro = (): UseMutationResult<IEditIntro, IErrorResponse, FormData> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData): Promise<IEditIntro> => {
      try {
        const res = await axiosInstance.put(`/intro/edit`, formData);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    onSuccess: (data: IEditIntro) => {
      toast.success(data.message);
      queryClient.setQueryData(['intro'], data);
    },
    onError: (error: IErrorResponse) => {
      toast.error(error);
    },
  });
};
