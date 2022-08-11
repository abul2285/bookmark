export const setUsername = (username) =>
  localStorage.setItem('username', username);

export const getUsername = () => localStorage.getItem('username');
