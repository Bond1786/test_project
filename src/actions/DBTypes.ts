import { Connection } from 'tedious';

export type DBParam = {
  dbUrl: string;
  userName: string;
  password: string;
  database: string;
  type: AUTH_TYPE;
};

export enum AUTH_TYPE {
  WINDOW_AUTH = 'WINDOW_AUTH',
  SQL_AUTH = 'SQL_AUTH'
}

export enum DBStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED'
}
export type DBConnection = {
  connection: Connection;
  status: DBStatus;
};

export type QueryData = {
  columnMetas: QueryColData[];
  rows: QueryRowData[];
};

export type QueryColData = {
  name: string;
  type: string;
};

export type QueryRowData = {
  [key: string]: string | number | null | any;
};
