import * as Types from './DBTypes';
import { StatusMessageEnum } from './StatusMessageEnum';

export type LoginRequest = {
  userName: string;
  password: string;
  database: string;
  dbUrl: string;
  type: Types.AUTH_TYPE;
};

export type LoginResponse = {
  token: string;
  message: StatusMessageEnum;
};

export type LogoutRequest = {
  token: string;
};

export type LogoutResponse = {
  message: StatusMessageEnum;
};
