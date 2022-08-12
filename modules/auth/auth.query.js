import { useQuery } from 'react-query';
import { getUser } from './auth.service';

export const useGetUser = (username) => {
  return useQuery(['getUser', username], getUser);
};
