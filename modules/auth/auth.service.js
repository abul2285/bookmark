import { getUsername } from '../../utils/storage';
import { httpMethodEnums } from '../../constants/HTTP';

export const getUser = async () => {
  const username = getUsername();
  if (!username) return;
  const res = await fetch(`/api/profile/${username}`, {
    method: httpMethodEnums.GET,
  });

  return res.json();
};

export const login = async (values) => {
  try {
    const res = await fetch('/api/login', {
      method: httpMethodEnums.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw res;
    return res.json();
  } catch (error) {
    const { message } = await error.json();

    throw new Error(message.split(`:`)[1]);
  }
};

export const register = async (values) => {
  try {
    const res = await fetch('/api/register', {
      method: httpMethodEnums.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) throw res;

    return res.json();
  } catch (error) {
    const { message } = await error.json();

    throw new Error(message.split(`:`)[1]);
  }
};

export const confirm = async (values) => {
  try {
    const res = await fetch('/api/confirm', {
      method: httpMethodEnums.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw res;
  } catch (error) {
    const { message } = await error.json();

    throw new Error(message.split(`:`)[1]);
  }
};

export const resetPassword = async (values) => {
  try {
    const res = await fetch('/api/password/reset', {
      method: httpMethodEnums.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) throw res;

    return res.json();
  } catch (error) {
    const { message } = await error.json();

    throw new Error(message.split(`:`)[1]);
  }
};

export const resetPasswordRequest = async (values) => {
  try {
    const res = await fetch('/api/password/reset_code', {
      method: httpMethodEnums.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw res;

    return res.json();
  } catch (error) {
    const { message } = await error.json();

    throw new Error(message.split(`:`)[1]);
  }
};
