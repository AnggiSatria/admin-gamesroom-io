import QueryString from 'qs';
import { ENDPOINT } from '../endpoint';
import { removeEmptyAttributes } from '../../removeEmptyAttributes';
import api from '@/shared/config/axios';
import { activeFilter } from '../interfaces/global.interface';

export const getGames = (activeFilter: activeFilter) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.Games}`, {
    params: { ...queryString },
  });
};

export const getGameById = (activeFilter: activeFilter, id: string) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.Game}/${id}`, {
    params: { ...queryString },
  });
};

export const postGame = (payload: FormData) => {
  return api.post(`${ENDPOINT.Root}${ENDPOINT.Game}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const putGame = (payload: FormData, id: string) => {
  return api.put(`${ENDPOINT.Root}${ENDPOINT.Game}/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteGame = (id: string) => {
  return api.delete(`${ENDPOINT.Root}${ENDPOINT.Game}/${id}`);
};
