import { config } from './config';

export const getBackendURL = () => {
  return `${config.PROTOCOL}://${config.BACKEND_HOSTNAME}:${config.PORT}`;
};