import toast from 'react-hot-toast';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { axiosInstance } from '../lib/types/definations';
import { errorResponse } from '../lib/utils/error';
import { IDefaultResponse, IErrorResponse } from '../lib/types/response';
import { IEmailFormData } from '../lib/types/formdata';

export const useSendEmail = (): UseMutationResult<IDefaultResponse, IErrorResponse, IEmailFormData> => {
  return useMutation({
    mutationFn: async (formData: IEmailFormData): Promise<IDefaultResponse> => {
      try {
        const res = await axiosInstance.post(`/contact`, formData);
        return res.data;
      } catch (error: unknown) {
        throw errorResponse(error);
      }
    },
    onSuccess: (data: IDefaultResponse) => {
      toast.success(data.message);
    },
    onError: (error: IErrorResponse) => {
      toast.error(error);
    },
  });
};
