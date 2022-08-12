import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

import {
  login,
  getUser,
  confirm,
  register,
  resetPassword,
  resetPasswordRequest,
} from './auth.service';
import { setUsername } from '../../utils/storage';

export const useGetUser = (username) => {
  return useQuery(['getUser', username], getUser);
};

export const useLogin = () => {
  const router = useRouter();
  return useMutation(login, {
    onSuccess: (_, { username }) => {
      setUsername(username);
      router.reload();
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation(register, {
    onSuccess: (data, { username }) => {
      if (!data.success) return;
      setUsername(username);
      router.push(
        {
          pathname: '/confirm',
          query: { username },
        },
        '/confirm'
      );
    },
  });
};

export const useConfirm = () => {
  const router = useRouter();

  return useMutation(confirm, {
    onSuccess: () => {
      router.push(
        {
          pathname: '/login',
          query: { confirmed: true },
        },
        '/login'
      );
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation(resetPassword, {
    onSuccess: () => {
      router.push(
        {
          pathname: '/login',
          query: { reset: true },
        },
        '/login'
      );
    },
  });
};

export const useResetPasswordRequest = () => {
  const router = useRouter();

  return useMutation(resetPasswordRequest, {
    onSuccess: (data) => {
      router.push(
        {
          pathname: '/password/reset',
          query: { username: data.username },
        },
        '/password/reset'
      );
    },
  });
};
