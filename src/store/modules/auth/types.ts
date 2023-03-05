export interface Credentials {
  email: string;
  password: string;
}

export interface Signup {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Token {
  token: string;
}

export interface ForgotPassword {
  email: string;
}

export interface ForgotPasswordVerify {
  token: string;
  newpassword: string;
}

export interface ChangeEmail {
  email: string;
  newemail: string;
}

export interface AuthState {
  user: Partial<User>;
  loading: boolean;
}

export interface AuthResult {
  message: string;
  user: User;
  token: string;
}

