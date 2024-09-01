import axios from 'axios';
import { getBackendURL } from './networkCommunication';
import {
  interceptTokenReq,
  interceptTokenResp,
  interceptTokenRespErr,
  strictTokenRespErr
} from './interceptors';
const clientContext = {
  withCredentials: true,
  baseURL: getBackendURL(),
  headers: {
    'Content-Type': 'application/json', // Common Content-Type for CORS
    Accept: 'application/json'
  }
};
export const $api = axios.create(clientContext);
export const $noInterceptApi = axios.create(clientContext);

$api.interceptors.request.use(interceptTokenReq);
$api.interceptors.response.use(interceptTokenResp, interceptTokenRespErr);

$noInterceptApi.interceptors.response.use(interceptTokenResp, strictTokenRespErr);
