import { render, screen, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { AppState, LOGIN_MODES, PAGE_TYPE } from '../redux/AppReducer';
import { AUTH_TYPE } from '../actions/Type';
import { rootReducer } from '../redux/store';
import PRDialog from './PRDialog';
import { StatusMessageEnum } from "../actions/StatusMessageEnum";
import { JIRA_ISSUE_TYPE, JIRA_PRIORITY, JIRA_STATUS } from '../actions/JiraEnums';



const initialState_FormData: AppState = {
  currentPage: PAGE_TYPE.LOGIN,
  loginMode: LOGIN_MODES.Guest,
  device: '',
  isConnected: false,
  dbParams: { type: AUTH_TYPE.WINDOW_AUTH, userName: "test_user", password: "password", dbUrl: "test_dbUrl", database: "test_database" },
  partSelected: '1',
  showPrRaisedDialog: true,
  hidePrRaisedDialog: false,
  isloading: false,
  isTreeviewLoading: false,
  isTableViewLoading: false,
  isPartListLoading: true,
  isloging: false,
  login: {
    isSucessfull: true,
    token: "adc"
  },
  formData: {
    "data": {
      "part_pin_configID": 4,
      "name": "SOIC28",
      "id": "SOIC28",
      "package_type": "SOIC28",
      "package_code": "null",
      "text": "SOIC28                                                                                              ",
      "displayID": "null",
      "alternate": "null",
      "tempID": "null",
      "part_partdescriptionfileID": 1
    },
    "isClear": false
  },
  raisePR: {
    "data": [{"tableName":"part_file","key":"version_0","value":{"part_fileID":"2","version":"1","release_status":"DRAFT","last_upd_date":null,"cvs_version":""}}]
  },
  jiraDataResponse: {
    message: StatusMessageEnum.SUCCESS, data: {
      key: "key", issuetype: JIRA_ISSUE_TYPE.STORY, description: "test_des",
      status: JIRA_STATUS.IN_PROGRESS, assignee: "Test_assignee",
      summary: "Test_summary", priority: JIRA_PRIORITY.MAJOR
    }
  }

};

export const initialState_noData: AppState = {
  currentPage: PAGE_TYPE.LOGIN,
  loginMode: LOGIN_MODES.Guest,
  device: '',
  isConnected: false,
  dbParams: { type: AUTH_TYPE.WINDOW_AUTH, userName: "test_user", password: "password", dbUrl: "test_dbUrl", database: "test_database" },
  partSelected: '1',
  formData: {
    isClear: true,
    data: {
      "part_pin_configID": 4,
    },
  }
};


let store = createStore(rootReducer);
const createCustomStore = (initialState: AppState) => {
  store = {
    ...store, ...store.getState().app = initialState
  }
  return store
}

beforeEach(() => {
  store = createStore(rootReducer);
  cleanup
});

const renderApp = (): RenderResult =>
  render(
    <Provider store={store}>
      <PRDialog />
    </Provider>
  );

afterEach(cleanup);

describe('PRDialog Controls Event Testing', () => {
  it("PRDialog  close Button Control", () => {
    createCustomStore(initialState_FormData);
    renderApp();
    let closeButton = screen.getByTestId(/closeButton/i);
    fireEvent.click(closeButton)

    let jira_Number = screen.getByTestId(/jira_Number/i);
    fireEvent.keyDown(jira_Number, { key: "Enter" })
    fireEvent.change(jira_Number, { target: { value: "Test_Value" } })

    let loadJira = screen.getByTestId(/loadJira/i);
    fireEvent.click(loadJira)

    let cancelPR = screen.getByTestId(/cancelPR/i);
    fireEvent.click(cancelPR)

    let rasiePR = screen.getByTestId(/rasiePR/i);
    fireEvent.click(rasiePR)

    // expect(store.getState().app.formData?.data).toBeDefined();
  });

})

describe('FormData Controls Event Testing', () => {
  it("Clear State", () => {
    createCustomStore(initialState_noData);
    renderApp();
  });
})

describe('FromData Controls Event Testing', () => {
  it("No form Data", () => {
    createCustomStore({
      currentPage: PAGE_TYPE.LOGIN,
      loginMode: LOGIN_MODES.Guest,
      device: '',
      isConnected: false,
      dbParams: { type: AUTH_TYPE.WINDOW_AUTH, userName: "test_user", password: "password", dbUrl: "test_dbUrl", database: "test_database" },
      partSelected: '1',
    });
    renderApp();
  });
})