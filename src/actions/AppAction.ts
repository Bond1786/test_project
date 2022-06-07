import { PAGE_TYPE } from '../redux/AppReducer';
import { JiraDataRequest } from './JiraTypes';
import { PRRequest } from './PRTypes';
import * as DBAPIs from './Type';
import * as authTypes from "./AuthTypes";
import { PartDataRequest } from './PartTypes';


export type AppAction = {
  type: APP_ACTION_TYPE;
  payload?: any;
};


export enum APP_ACTION_TYPE {
  PAGE_CHANGE = 'PAGE_CHANGE',
  QUERY_TABLE = 'QUERY_TABLE',
  QUERY_TABLE_SUCCESS = 'QUERY_TABLE_SUCCESS',
  QUERY_TABLE_FAIL = 'QUERY_TABLE_FAIL',
  LOGIN = 'LOGIN',
  RESET = 'RESET',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  INITIAL_DATA = 'INITIAL_DATA',
  INITIAL_DATA_SUCCESS = 'INITIAL_DATA_SUCCESS',
  INITIAL_DATA_FAIL = 'INITIAL_DATA_FAIL',
  QUERY_PART_LIST_FAIL = 'QUERY_PART_LIST_FAIl',
  LOAD_FORM_DATA = 'LOAD_FORM_DATA',
  LOGIN_MODE = 'LOGIN_MODE',
  LOGOUT = 'LOGOUT',
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAIL = "LOGOUT_FAIL",
  SELECT_PART_VALUE = "SELECT_PART_VALUE",
  DEFAULT = "DEFAULT",
  LOADING = "LOADING",
  HIDE_LOADING = "HIDE_LOADING",
  QUERY_JIRA = "QUERY_JIRA",
  QUERY_JIRA_SUCCESS = "QUERY_JIRA_SUCCESS",
  QUERY_JIRA_FAIL = "QUERY_JIRA_FAIL",
  
  QUERY_PR_FAIL = "QUERY_PR_FAIL",
  SHOW_PR_RAISED_DIALOG = "SHOW_PR_RAISED_DIALOG",
  HIDE_PR_RAISED_DIALOG = "HIDE_PR_RAISED_DIALOG",

  CREATE_PR = "CREATE_PR",
  CREATE_PR_SUCCESS = "CREATE_PR_SUCCESS",
  CREATE_PR_FAIL = "QCREATE_PR_FAIL",

  FETCH_PART_VALUE_DATA = "FETCH_PART_VALUE_DATA",
  FETCH_PART_VALUE_DATA_SUCCESS = "FETCH_PART_VALUE_DATA_SUCCESS",
  FETCH_PART_VALUE_DATA_FAIL = "FETCH_PART_VALUE_DATA_FAIL",

  FETCH_VERSION = "FETCH_VERSION",
  FETCH_VERSION_SUCCESS = "FETCH_VERSION_SUCCESS",
  FETCH_VERSION_FAIL = "FETCH_VERSION_FAIL"
}

export const pageChangeAction = (pageType: PAGE_TYPE): AppAction => {
  return { type: APP_ACTION_TYPE.PAGE_CHANGE, payload: pageType };
};

export const queryForTable = (dbPath: string, sel: string, where: string | undefined) => {
  return 'SELECT ' + sel + ' FROM ' + dbPath + ' ' + (where ? where : '');
};

export const tableSelectedAction = (tableName: string, token: string, tableLblText: string, where?: string): AppAction => {

  let tableID = where?.split("=")[1] ?? "1";
  const execProcedure = 'EXEC read_' + tableName + " " + tableID;
  return {
    type: APP_ACTION_TYPE.QUERY_TABLE,
    payload: {
      api: "/api/parttabledata", token: token, query: execProcedure,
      tableInfo: {
        tableLabelText:tableLblText,
        tableName: tableName,
      },
      whereStatement: where
    }
  };
};


export const querySuccessForTable = (tableName: string, queryData: DBAPIs.QueryData): AppAction => {
  return {
    type: APP_ACTION_TYPE.QUERY_TABLE_SUCCESS,
    payload: {
      tableName: tableName,
      queryData: queryData
    }
  };
};

export const queryFailForTable = (): AppAction => {
  return { type: APP_ACTION_TYPE.QUERY_TABLE_FAIL };
};

export const resetAction = (): AppAction => {
  return { type: APP_ACTION_TYPE.RESET };
};

export const loginAction = (loginRestApi: authTypes.LoginRequest): AppAction => {
  return { type: APP_ACTION_TYPE.LOGIN, payload: loginRestApi };
};

export const loginModeAction = (mode: string): AppAction => {
  return { type: APP_ACTION_TYPE.LOGIN_MODE, payload: mode };
};

export const loginSuccessAction = (dbParams: DBAPIs.DBParam): AppAction => {
  return { type: APP_ACTION_TYPE.LOGIN_SUCCESS, payload: dbParams };
};

export const loginFailAction = (): AppAction => {
  return { type: APP_ACTION_TYPE.LOGIN_FAIL };
};

export const logoutAction = (logout: authTypes.LogoutRequest): AppAction => {
  return { type: APP_ACTION_TYPE.LOGOUT, payload: logout };
};

export const loadInitialData = (usrtoekn: string, partid: string): AppAction => {
  return { type: APP_ACTION_TYPE.INITIAL_DATA, payload: { api: ["/api/partlist", "/api/partdata"], token: usrtoekn, partId: partid } };
};

export const LoadFormData = (data: DBAPIs.QueryRowData): AppAction => {
  return { type: APP_ACTION_TYPE.LOAD_FORM_DATA, payload: data };
};

export const updateSelectedPartValue = (value: string): AppAction => {
  return { type: APP_ACTION_TYPE.SELECT_PART_VALUE, payload: value };
};

export const queryForJiraStatus = (jiraRequest: JiraDataRequest): AppAction => {
  return { type: APP_ACTION_TYPE.QUERY_JIRA, payload: { api: "/api/jiradata", jiraReq: jiraRequest } };
};

export const createPullRequest = (prRequest: PRRequest): AppAction => {
  return { type: APP_ACTION_TYPE.CREATE_PR, payload: { api: "/api/createpr", prReq: prRequest } };
};

export const showPrRasiedDialog = (data: any): AppAction => {
  return { type: APP_ACTION_TYPE.SHOW_PR_RAISED_DIALOG, payload: data };
};

export const hidePrRasiedDialog = (): AppAction => {
  return { type: APP_ACTION_TYPE.HIDE_PR_RAISED_DIALOG };
};

export const getSelectedPartValueData = (partDataReq: PartDataRequest): AppAction => {
  return { type: APP_ACTION_TYPE.FETCH_PART_VALUE_DATA, payload: { api: "/api/partdata", partDataReq: partDataReq } };
};

export const getVersions = (): AppAction => {
  return { type: APP_ACTION_TYPE.FETCH_VERSION, payload: { api: "/api/versions" } };
};
