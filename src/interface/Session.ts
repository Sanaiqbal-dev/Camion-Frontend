export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUser{
  username: string;
  role: string;
}
export interface ISessionState {
  username: string | null;
  role: string | null;
  token: string | null;
  status: "active" | "expired";
}
export interface ILoginResponse {
  token: string;
  username: string;
  role: string;
  status: string;
}

export interface ILoginError {
  message: string;
}