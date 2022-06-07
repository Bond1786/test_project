export type Login_Reply = {
    status: boolean /* true:login success, fasle:login fail */
    message?: string  /* if fail show the fail reason */
    token: string    /* uniq encoaded string correspond to user name and password */
}

export type Login_Request = {
    dbUrl: string; /* */
    userName: string;
    password: string;
    database: string;
    type: 'WINDOW_AUTH' | 'SQL_AUTH';
}
