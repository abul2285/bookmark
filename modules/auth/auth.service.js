import { httpMethodEnums } from '../../consts/HTTP';
import { getUsername } from '../../utils/storage';

export const getUser = async () => {
  const username = getUsername();
  if (!username) return;
  const res = await fetch(`/api/profile/${username}`, {
    method: httpMethodEnums.GET,
  });

  return res.json();
};
