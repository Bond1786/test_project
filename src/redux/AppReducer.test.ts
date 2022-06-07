import reducer, { AppState, LOGIN_MODES, PAGE_TYPE } from './AppReducer';
import { APP_ACTION_TYPE, queryForTable } from '../actions/AppAction';
import * as DBAPIs from '../actions/Type';


const DEFAULT_GUEST_LOGIN: DBAPIs.DBParam = {
  database: 'UnifiedDeviceDB',
  password: 'JsK6Bm@Th2C879k2',
  dbUrl: 'CHN-CL-DEVSQL',
  userName: 'UnifiedDeviceDB_user',
  type: DBAPIs.AUTH_TYPE.SQL_AUTH
};

const initialState: AppState = {
  currentPage: PAGE_TYPE.LOGIN,
  loginMode: LOGIN_MODES.Guest,
  device: '',
  isConnected: false,
  dbParams: DEFAULT_GUEST_LOGIN,
  partSelected: '1',
};

describe('Authenticate Reducer', () => {

  it('handles login LOGIN', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.LOGIN, payload: {
        login: {
          isSucessfull: true,
          message: "Test msg",
          token: "Test Token"
        }
      }
    }).isloging).toBeTruthy();
  });


  it('handles login LOGIN_SUCCESS', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.LOGIN_SUCCESS, payload: {
        login: {
          isSucessfull: true,
          message: "Test msg",
          token: "Test Token"
        }
      }
    }).login?.token).toBeUndefined();
    
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.LOGIN_SUCCESS, payload: {
        login: {
          isSucessfull: true,
          message: "Test msg",
          token: "Test Token"
        }
      }
    }).currentPage).toBe(PAGE_TYPE.SELECTION);
  });

  it('handles login LOGIN_FAIL', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.LOGIN_FAIL, payload: {
        login: {
          isSucessfull: true,
          message: "Test msg",
          token: "Test Token"
        }
      }
    }).currentPage).toBe(
      PAGE_TYPE.SELECTION
    );

    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.LOGIN_FAIL, payload: {
        login: {
          isSucessfull: true,
          message: "Test msg",
          token: "Test Token"
        }
      }
    }).login?.token).toBeUndefined;
  });


  it('handles RESET', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.RESET, payload: APP_ACTION_TYPE.LOGIN_MODE
    }).currentPage).toBe(
      PAGE_TYPE.LOGIN
    );
  });

  it('handles PAGE_CHANGE', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.PAGE_CHANGE, payload: PAGE_TYPE.LOGIN
    }).currentPage).toBe(
      PAGE_TYPE.LOGIN
    );
  });


  it('handles QUERY_TABLE_SUCCESS', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.QUERY_TABLE_SUCCESS, payload: { data: { tableName: "TestTable" } }
    })?.selectedTable?.tableData).toEqual({ "tableName": "TestTable" });
  });


  it('handles LOGIN_MODE Guest', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.LOGIN_MODE, payload: LOGIN_MODES.Guest
    }).loginMode).toBe(LOGIN_MODES.Guest);
  });

  it('handles LOGIN_MODE SQL Authentication', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.LOGIN_MODE, payload: LOGIN_MODES['SQL Authentication']
    }).loginMode).toBe(LOGIN_MODES['SQL Authentication']);
  });

  it('handles INITIAL_DATA', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.INITIAL_DATA, payload: "initial_data"
    }).isPartListLoading).toBeTruthy();
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.INITIAL_DATA, payload: "initial_data"
    }).isTreeviewLoading).toBeTruthy()
  });

  it('handles INITIAL_DATA_SUCCESS', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.INITIAL_DATA_SUCCESS, payload: "initial_data"
    }).isPartListLoading).toBeFalsy();
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.INITIAL_DATA_SUCCESS, payload: "initial_data"
    }).isTreeviewLoading).toBeFalsy()
  });

  it('handles INITIAL_DATA_FAIL', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.INITIAL_DATA_FAIL, payload: "initial_data"
    }).isPartListLoading).toBeFalsy();
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.INITIAL_DATA_FAIL, payload: "initial_data"
    }).isTreeviewLoading).toBeTruthy()
  });

  it('handles QUERY_PART_LIST_FAIL', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.QUERY_PART_LIST_FAIL, payload: "query_partlist_data"
    }).partList).toBe(undefined);

    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.QUERY_PART_LIST_FAIL, payload: "query_partlist_data"
    }).partList).toBeUndefined();
  });


  it('handles LOGOUT', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.LOGOUT, payload: { data: true }
    }).formData?.isClear).toBeFalsy();
  });

  it('handles LOAD_FORM_DATA', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.LOAD_FORM_DATA, payload: { data: true }
    }).isConnected).toBeFalsy();
  });

  it('handles SELECT_PART_VALUE', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.SELECT_PART_VALUE, payload: APP_ACTION_TYPE.SELECT_PART_VALUE
    }).partSelected).toBe(APP_ACTION_TYPE.SELECT_PART_VALUE);
  });

  it('handles Default', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.DEFAULT, payload: APP_ACTION_TYPE.DEFAULT
    }).currentPage).toBe(APP_ACTION_TYPE.LOGIN);
  });

  it('handles undefined state', () => {
    expect(reducer(undefined, {
      type: APP_ACTION_TYPE.PAGE_CHANGE, payload: PAGE_TYPE.LOGIN
    }).currentPage).toBe(
      PAGE_TYPE.LOGIN
    );
  });

  it('handles QUERY_TABLE state', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.QUERY_TABLE, payload: { post: "/select", query: queryForTable("dbPath", ' TOP (1000) * ', "where") }
    }).isTableViewLoading).toBeTruthy();
  });

  it('handles LOGOUT_SUCCESS state', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.LOGOUT_SUCCESS, payload: {}
    }).isConnected).toBeFalsy();
  });

  it('handles LOGOUT_FAIL state', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.LOGOUT_FAIL, payload: {}
    }).currentPage).toBe(PAGE_TYPE.LOGIN);
  });

  it('handles SHOW_PR_RAISED_DIALOG state', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.SHOW_PR_RAISED_DIALOG, payload: {}
    }).showPrRaisedDialog).toBeTruthy();
  });

  it('handles HIDE_PR_RAISED_DIALOG state', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.HIDE_PR_RAISED_DIALOG, payload: {}
    }).showPrRaisedDialog).toBeFalsy();
  });

  it('handles CREATE_PR_SUCCESS & CREATE_PR_FAIL state', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.CREATE_PR_SUCCESS, payload: { prlink: ""}
    }).createPRlink).toBeDefined();
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.CREATE_PR_FAIL, payload: { prlink: undefined}
    }).createPRlink).toBeUndefined();
  });

  it('handles LOADING  state', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.LOADING, payload: {}
    }).isloading).toBeTruthy();
  });

  it('handles HIDE_LOADING state', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.HIDE_LOADING, payload: {}
    }).isloading).toBeFalsy();
  });


  it('handles FETCH_PART_VALUE_DATA  state', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.FETCH_PART_VALUE_DATA, payload: {}
    }).isTreeviewLoading).toBeTruthy();
  });
  it('handles FETCH_PART_VALUE_DATA_SUCCESS & FETCH_PART_VALUE_DATA_FAIL state', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.FETCH_PART_VALUE_DATA_SUCCESS, payload: {}
    }).isTreeviewLoading).toBeTruthy();

    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.FETCH_PART_VALUE_DATA_FAIL, payload: {}
    }).isTreeviewLoading).toBeTruthy();
  });


  it('handles QUERY_JIRA & QUERY_JIRA state', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.QUERY_JIRA, payload: {}
    }).isJiraStatusLoading).toBeTruthy();

    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.QUERY_JIRA_SUCCESS, payload: {}
    }).isJiraStatusLoading).toBeFalsy();

    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.QUERY_JIRA_FAIL, payload: {}
    }).isJiraStatusLoading).toBeFalsy();
  });

  it('handles FETCH_VERSION & FETCH_VERSION state', () => {
    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.FETCH_VERSION, payload: {}
    })).toBeDefined();

    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.FETCH_VERSION_SUCCESS, payload: { serverVersion: "0.3.0", clientVersion: "^0.1.0-dev.9" }
    }).versionData?.clientVersion).toBe("^0.1.0-dev.9");

    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.FETCH_VERSION_SUCCESS, payload: { serverVersion: "0.3.0", clientVersion: "^0.1.0-dev.9" }
    }).versionData?.serverVersion).toBe("0.3.0");

    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.FETCH_VERSION_FAIL, payload: {}
    }).versionData?.clientVersion).toBeUndefined();

    expect(reducer(initialState, {
      type: APP_ACTION_TYPE.FETCH_VERSION_FAIL, payload: {}
    }).versionData?.serverVersion).toBeUndefined();
  });

});
