
import { JiraDataResponse } from '../actions/JiraTypes';
import { Part, PartTreeNode } from '../actions/PartTypes';
import { AppAction, APP_ACTION_TYPE } from '../actions/AppAction';
import * as DBAPIs from '../actions/Type';
import { UdeVersion } from '../actions/CommonTypes';
import TreeNode from 'primereact/treenode';
import { treeData } from './meta_data';

export enum PAGE_TYPE {
  LOGIN = 'LOGIN',
  SELECTION = 'SELECTION',
  EDIT = 'EDIT'
}

export enum LOGIN_MODES {
  'Guest' = 'Guest',
  'Windows Authentication' = 'Windows Authentication',
  'SQL Authentication' = 'SQL Authentication'
}
export type PartListType = {
  [key: string]: number
}

export let versions: UdeVersion = { clientVersion: "", serverVersion: "" };

export type AppState = {
  isConnected: boolean;
  login?: {
    isSucessfull: boolean,
    token?: string,
    message?: string,
  }

  currentPage: PAGE_TYPE;
  loginMode: LOGIN_MODES;
  dbParams: DBAPIs.DBParam;
  device: string;
  selectedTable?: {
    tableInfo?: {
      tableLabelText?: string,
      tableName?: string,
    }
    tableData?: DBAPIs.QueryData;
    rowIndex: number;
    where?: string
  };
  partList?: Part[]// { data: DBAPIs.QueryData | any; isDataAvaiale: boolean }
  partSelected?: string;
  formData?: {
    data?: DBAPIs.QueryRowData;
    isClear: boolean;
  };
  raisePR?: {
    data?: any
  },
  showPrRaisedDialog?: boolean,
  hidePrRaisedDialog?: boolean,
  jiraDataResponse?: JiraDataResponse,
  createPRlink?: string,
  treeViewData?: TreeNode[]
  versionData?: UdeVersion

  isloging?: boolean,
  isloading?: boolean,
  isTreeviewLoading?: boolean,
  isTableViewLoading?: boolean,
  isPartListLoading?: boolean,
  isJiraStatusLoading?: boolean,

};



export type Column = {
  name: string;
};

export type Row = {
  [colName: string]: string;
};

const DEFAULT_GUEST_LOGIN: DBAPIs.DBParam = {
  database: 'test_dataBase',
  password: 'xxxxxxx',
  dbUrl: 'test_url',
  userName: 'test_user',
  type: DBAPIs.AUTH_TYPE.SQL_AUTH
};

export const initialState: AppState = {
  currentPage: PAGE_TYPE.LOGIN,
  loginMode: LOGIN_MODES['SQL Authentication'],
  device: '',
  isConnected: false,
  dbParams: DEFAULT_GUEST_LOGIN,
  partSelected: '1',
  showPrRaisedDialog: false,
  hidePrRaisedDialog: false,
  isloading: false,
  isTreeviewLoading: true,
  isTableViewLoading: false,
  isPartListLoading: false,
  isloging: false,
  isJiraStatusLoading: false,
  treeViewData : treeData,
  login: {
    isSucessfull: true,
    message: "I am Dummy Project",
    token: "abcd",

  }

};



const reducer = (state: AppState = initialState, action: AppAction): AppState => {
  let retState: AppState = { ...state };
  let loginPayload: Pick<AppState, "login">
  switch (action.type) {
    case APP_ACTION_TYPE.PAGE_CHANGE:
      retState = { ...retState, currentPage: action.payload as PAGE_TYPE };
      break;
    case APP_ACTION_TYPE.QUERY_TABLE:
      retState = {
        ...retState,
        selectedTable: {
          rowIndex: 0,
          tableInfo: action.payload?.tableInfo,
          where: action.payload?.whereStatement
        },
        isTableViewLoading: true
      };
      break;
    case APP_ACTION_TYPE.QUERY_TABLE_SUCCESS:
      retState = {
        ...retState,
        isTableViewLoading: false,
        formData: {
          isClear: true
        },
        selectedTable: {
          ...retState?.selectedTable,
          tableData: action.payload?.data,
          rowIndex: 0
        }
      };
      break;
    case APP_ACTION_TYPE.LOGIN:
      retState = {
        ...retState,
        isloging: true,
        dbParams: action.payload,
      };
      break;
    case APP_ACTION_TYPE.LOGIN_SUCCESS:
      loginPayload = action.payload;
      if (loginPayload.login) {
        retState = {
          ...retState,
          isloging: false,
          // login: {
          //   isSucessfull: loginPayload.login.isSucessfull,
          //   message: loginPayload.login.message,
          //   token: loginPayload.login.token
          // },
          currentPage: PAGE_TYPE.SELECTION,
        };
      }
      break;
    case APP_ACTION_TYPE.LOGIN_FAIL:
      loginPayload = action.payload;
      if (loginPayload.login) {
        retState = {
          ...retState,
          isloging: false,
          // login: {
          //   isSucessfull: loginPayload.login.isSucessfull,
          //   message: loginPayload.login.message,
          //   token: loginPayload.login.token
          // },
          isConnected: false,
          currentPage: PAGE_TYPE.SELECTION,
        }
      };
      break;
    case APP_ACTION_TYPE.RESET:
      retState = { ...initialState, versionData: versions };

      break;
    case APP_ACTION_TYPE.LOGIN_MODE:
      const loginMode = action.payload;

      if (loginMode === LOGIN_MODES.Guest) {
        retState = {
          ...retState,
          isConnected: false,
          loginMode: LOGIN_MODES.Guest,
          dbParams: DEFAULT_GUEST_LOGIN,

        };
      } else {
        retState = {
          ...retState,
          loginMode: loginMode,
          isConnected: false,
        };
      }
      break;
    case APP_ACTION_TYPE.INITIAL_DATA:
      retState = {
        ...retState,
        isPartListLoading: true,
        isTreeviewLoading: true,
      };
      break;
    case APP_ACTION_TYPE.INITIAL_DATA_SUCCESS:
      retState = {
        ...retState,
        isPartListLoading: false,
        isTreeviewLoading: false,
        partList: action.payload.list?.data,
        treeViewData: treeData,
        partSelected: action.payload.list?.data ?? "1",
        selectedTable: {
          rowIndex: 0
        },
        formData: {
          isClear: true
        },
      };
      break;
    case APP_ACTION_TYPE.INITIAL_DATA_FAIL:
      retState = {
        ...retState,
        isPartListLoading: false,
        isTreeviewLoading: true,
      };
      break;
    case APP_ACTION_TYPE.QUERY_PART_LIST_FAIL:
      retState = {
        ...retState,
        isPartListLoading: false,
        partList: undefined
      };
      break;
    case APP_ACTION_TYPE.LOAD_FORM_DATA:
      retState = {
        ...retState,
        formData: { data: action.payload, isClear: false }
      };
      break;
    case APP_ACTION_TYPE.LOGOUT_SUCCESS:
      retState = {
        ...initialState,
        isConnected: false,
        currentPage: PAGE_TYPE.LOGIN,
        versionData: versions
      };
      break;
    case APP_ACTION_TYPE.LOGOUT_FAIL:
      retState = {
        ...initialState,
        isConnected: false,
        currentPage: PAGE_TYPE.LOGIN,
        versionData: versions
      };
      break;
    case APP_ACTION_TYPE.SELECT_PART_VALUE:
      retState = {
        ...retState,
        partSelected: action.payload
      };
      break;
    case APP_ACTION_TYPE.QUERY_JIRA:
      retState = {
        ...retState,
        isJiraStatusLoading: true
      };
      break;
    case APP_ACTION_TYPE.QUERY_JIRA_SUCCESS:
      retState = {
        ...retState,
        jiraDataResponse: action.payload,
        isJiraStatusLoading: false
      };
    case APP_ACTION_TYPE.QUERY_JIRA_FAIL:
      retState = {
        ...retState,
        isJiraStatusLoading: false
      };
      break;
    case APP_ACTION_TYPE.SHOW_PR_RAISED_DIALOG:
      retState = {
        ...retState,
        showPrRaisedDialog: true,
        raisePR: {
          data: action.payload
        },
      };
      break;

    case APP_ACTION_TYPE.HIDE_PR_RAISED_DIALOG:
      retState = {
        ...retState,
        showPrRaisedDialog: false,
        hidePrRaisedDialog: false,
        jiraDataResponse: undefined
      };
      break;
    case APP_ACTION_TYPE.CREATE_PR_SUCCESS:
      retState = {
        ...retState,
        createPRlink: action.payload.prlink,
        isJiraStatusLoading: false
      };
      break;
    case APP_ACTION_TYPE.CREATE_PR_FAIL:
      retState = {
        ...retState,
        createPRlink: action.payload.prlink
      };
      break;
    case APP_ACTION_TYPE.LOADING:
      retState = {
        ...retState,
        isloading: true
      };
      break;
    case APP_ACTION_TYPE.HIDE_LOADING:
      retState = {
        ...retState,
        isloading: false
      };
      break;
    case APP_ACTION_TYPE.FETCH_PART_VALUE_DATA:
      retState = {
        ...retState,
        isTreeviewLoading: true,
        partSelected: action.payload?.partID ?? "1",
        selectedTable: {
          // ...retState?.selectedTable,
          rowIndex: 0
        }, formData: {
          isClear: true
        },
      };
      break;
    case APP_ACTION_TYPE.FETCH_PART_VALUE_DATA_SUCCESS:
      retState = {
        ...retState,
        treeViewData: treeData,
        isTreeviewLoading: true
      };
      break;
    case APP_ACTION_TYPE.FETCH_PART_VALUE_DATA_FAIL:
      retState = {
        ...retState,
        treeViewData: treeData,
        isTreeviewLoading: true
      };
      break;
    case APP_ACTION_TYPE.FETCH_VERSION:
      retState = {
        ...retState,
      };
      break;
    case APP_ACTION_TYPE.FETCH_VERSION_SUCCESS:
      retState = {
        ...retState,
        versionData: action.payload
      };
      versions = action.payload;
      break;
    case APP_ACTION_TYPE.FETCH_VERSION_FAIL:
      retState = {
        ...retState,
        versionData: action.payload
      };
      break;
    default:
      break;
  }
  return retState;
};
export default reducer;
