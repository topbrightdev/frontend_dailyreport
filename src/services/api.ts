import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

import {
  Credentials,
  AuthResult,
  ForgotPasswordVerify,
  ForgotPassword,
  ChangeEmail,
  Token,
  Signup,
} from "../store/modules/auth/types";
import { Report, ReportResult, UpdatedReport } from "../store/modules/report/types"
import { storageConst } from "helpers/const.helper";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
  timeout: 2000,
});

axiosInstance.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    const token = await AsyncLocalStorage.getItem(storageConst);
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  () => {}
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg = error.response?.data?.message || "Failed to connect to server";
    toast.error(msg);
  }
);

const api = {
  signin: (credentials: Credentials) =>
    axiosInstance.post<AuthResult>("auth/signin", credentials),
  signinwithtoken: (token: Token) =>
    axiosInstance.post<AuthResult>("auth/signin/token", token),
  signup: (credentials: Signup) =>
    axiosInstance.post<AuthResult>("auth/signup", credentials),
  signupverify: (token: Token) =>
    axiosInstance.post<AuthResult>("auth/signup/verify", token),
  forgotpassword: (email: ForgotPassword) =>
    axiosInstance.post<AuthResult>("auth/forgotpassword", email),
  forgotpasswordverify: (params: ForgotPasswordVerify) =>
    axiosInstance.post<AuthResult>("auth/forgotpassword/verify", params),
  changeemail: (emails: ChangeEmail) =>
    axiosInstance.post<AuthResult>("auth/changeemail", emails),
  signout: () => axiosInstance.post<AuthResult>("auth/signout"),
  createreporting: (report: Report) =>
    axiosInstance.post<ReportResult>("report/createreporting", report),
  getreporting: (username: string) => 
    axiosInstance.get<ReportResult>(`report/getreporting/${username}`),
  deletereporting: (_id: string) => 
    axiosInstance.delete(`report/deletereporting/${_id}`),
  updatereporting: (updatedReport: UpdatedReport) =>
    axiosInstance.post('report/updatereporting', updatedReport),
  getallreporting: () =>
    axiosInstance.get<ReportResult>('report/getallreporting'),
};

export default api;
