import axios, { AxiosError, AxiosResponse } from "axios";
// import { readCookie } from './../../../helpers/login';
// import { logout } from '../../../helpers/logout';
// import { EToken } from '../../../constants/login';
import queryString from 'query-string';
const baseURL = process.env.URL_MY_API;
// const token = readCookie(EToken.COMUNITY_ACCESS_KEY);
const token = localStorage.getItem('jwt');

const buildysURL = process.env.REACT_APP_LINK_BUILDYS;

const axiosMy = axios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "application/json",
    Authorization: token,
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosMy.interceptors.response.use(
  (res: AxiosResponse<{ content: any; message: string; result: number }>) => {
    if (res.data.result === 0) {
      // logout(buildysURL + "");
    }
    return res;
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      // logout(buildysURL + "");
    }
    throw err;
  }
);

export default axiosMy;
