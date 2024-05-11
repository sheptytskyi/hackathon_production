import { UserTypes } from '@constants/entities/user.ts';

export type ILoginRequest = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  access: string;
  refresh: string;
};

export type ICreateUserRequest = {
  first_name: string;
  last_name: string;
  user_type: UserTypes;
  email: string;
  password: string;
  password_2: string;
};

export interface IProfile {
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
  user_type: UserTypes;
}
