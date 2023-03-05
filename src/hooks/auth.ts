import { toast } from "react-toastify";
import api from "services/api";
import {
  ChangeEmail,
  Credentials,
  ForgotPassword,
} from "store/modules/auth/types";

// export const signup = async (credentials: Credentials) => {
//   const response = await api.signup(credentials);
//   toast.success(response.data?.message);
// };

export const changeemail = async (emails: ChangeEmail) => {
  const response = await api.changeemail(emails);
  toast.success(response.data?.message);
};

export const forgotpassword = async (email: ForgotPassword) => {
  const response = await api.forgotpassword(email);
  toast.success(response.data?.message);
};
