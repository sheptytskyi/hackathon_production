export type ILoginRequest = {
  phone_number: string;
  password: string;
};

export type ILoginResponse = {
  access: string;
  refresh: string;
};

export type ICreateUserRequest = {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  password_2: string;
};

export interface IProfile {
  first_name: string;
  last_name: string;
  phone_number: string;
  date_joined: string;
}
