import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  getBookmarks,
  createBookmark,
  getBookmarkById,
  removeBookmarkById,
  updateBookmarkById,
} from './bookmark.service';

export const useGetBookmarkById = (id) => {
  return useQuery(['getBookmarkById', id], getBookmarkById);
};

export const useGetBookmarks = () => {
  return useQuery('bookmarks', getBookmarks);
};

export const useRemoveBookmarkById = () => {
  const client = useQueryClient();
  return useMutation(removeBookmarkById, {
    onSuccess: () => {
      client.invalidateQueries(['bookmarks']);
    },
  });
};

export const useCreateBookmark = () => {
  const client = useQueryClient();
  return useMutation(createBookmark, {
    onSuccess: () => {
      client.invalidateQueries(['bookmarks']);
    },
  });
};

export const useUpdateBookmarkById = () => {
  const client = useQueryClient();
  return useMutation(updateBookmarkById, {
    onSuccess: () => {
      client.invalidateQueries(['bookmarks']);
    },
  });
};
