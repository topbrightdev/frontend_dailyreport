import { toast } from "react-toastify";
import { storageConst } from "helpers/const.helper";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

import api from "../../../services/api";
import {  AuthState, Credentials, ForgotPasswordVerify, Token,Signup } from "./types";

const initialState: AuthState = {
  user: {
    id: 0,
    email: "",
    name:"",
  },
  loading: false,
};

const signinWithToken = createAsyncThunk(
  "auth/signintoken",
  async (data: Token) => {
    const response = await api.signinwithtoken(data);
    toast.success(response.data.message);
    await AsyncLocalStorage.setItem(storageConst, response.data.token);
    return response.data;
  }
);

const signin = createAsyncThunk(
  "auth/signin",
  async (credentials: Credentials) => {
    const response = await api.signin(credentials);
    toast.success(response.data.message);
    await AsyncLocalStorage.setItem("token", response.data.token);
    await AsyncLocalStorage.setItem("username", response.data.user.name);
    return response.data;
  }
);

const signup = createAsyncThunk(
  "auth/signup",
  async (signup: Signup) => {
    const response = await api.signup(signup);
    toast.success(response.data.message);
    return response.data;
  }
);

const signupverify = createAsyncThunk(
  "auth/signupverify",
  async (token: Token) => {
    const response = await api.signupverify(token);
    await AsyncLocalStorage.setItem(storageConst, response.data.token);
    toast.success(response.data.message);
    return response.data;
  }
);

const forgotpasswordverify = createAsyncThunk(
  "auth/forgotpasswordverify",
  async (tokenandnewpassword: ForgotPasswordVerify) => {
    const response = await api.forgotpasswordverify(tokenandnewpassword);
    await AsyncLocalStorage.setItem(storageConst, response.data.token);
    toast.success(response.data.message);
    return response.data;
  }
);

const signout = createAsyncThunk("auth/signout", async () => {
  const response = await api.signout();
  await AsyncLocalStorage.removeItem(storageConst);
  toast.success(response.data.message);
  return initialState;
});



export { signinWithToken, signin, signupverify, forgotpasswordverify, signout, signup };
