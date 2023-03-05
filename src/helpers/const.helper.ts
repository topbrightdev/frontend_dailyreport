export const emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const passwordReg =
  /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const errorMsg = {
  mail: "Please enter correct email",
  password:
    "Please enter a strong password. Password must be at least 8 characters and contain at least one special character and number!",
  token: "Something went wrong",
};
export const storageConst = "token";
