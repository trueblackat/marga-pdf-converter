import { API_HOST } from '@/constants/api.constants';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const getAbsoluteFileApiLink = (link) => `${API_HOST}${link}`;
