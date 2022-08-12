import { httpMethodEnums } from '../../consts/HTTP';

export const getBookmarkById = async ({ queryKey }) => {
  console.log({ queryKey });
  const [_, id] = queryKey;
  const res = await fetch({
    url: `/api/bookmark/${id}`,
    method: httpMethodEnums.GET,
  });

  return res.json();
};

export const getBookmarks = async () => {
  const res = await fetch(`/api/bookmarks`, {
    method: httpMethodEnums.GET,
  });

  return res.json();
};

export const createBookmark = async (body) => {
  const res = await fetch('/api/bookmarks/create', {
    method: httpMethodEnums.POST,
    body: JSON.stringify(body),
  });

  return res.json();
};

export const removeBookmarkById = async (id) => {
  const res = await fetch(`/api/bookmarks/${id}`, {
    method: httpMethodEnums.DELETE,
  });

  return res.json();
};

export const updateBookmarkById = async (body) => {
  const { id, ...args } = body;
  const res = await fetch(`/api/bookmarks/${id}`, {
    method: httpMethodEnums.PUT,
    body: JSON.stringify(args),
  });

  return res.json();
};
