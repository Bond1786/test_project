import { type } from "os";

export type DBParam = {
  dbUrl: string;
  userName: string;
  password: string;
  database: string;
  type: AUTH_TYPE;
};

export enum URL_TYPE {
 BASE_URL= "http://localhost:5000"
}
export enum AUTH_TYPE {
  WINDOW_AUTH = 'WINDOW_AUTH',
  SQL_AUTH = 'SQL_AUTH'
}

export enum DBStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED'
}


export type QueryData = {
  columnMetas: QueryColData[];
  rows: QueryRowData[];
};

export type QueryColData = {
  name: string;
  type: string;
};

export type QueryRowData = {
  [key: string]: string | number;
};




export interface IArticle {
    id: number
    title: string
    body: string
  }
  
  export type ArticleState = {
    articles: IArticle[]
  }
  
  export type ArticleAction = {
    type: string
    article: IArticle
  }
  
  export type DispatchType = (args: ArticleAction) => ArticleAction