import { render, screen, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { AppState, LOGIN_MODES, PAGE_TYPE } from '../redux/AppReducer';
import { AUTH_TYPE } from '../actions/Type';
import { rootReducer } from '../redux/store';
import FormData from './FormData';



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
  raisePR: { data: { name: "tableView" } }

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
      <FormData />
    </Provider>
  );

afterEach(cleanup);

describe('FormData Controls Event Testing', () => {
  it("FormData  Treeview Control", () => {
    createCustomStore(initialState_FormData);
    renderApp();
    let formView = screen.getAllByTestId(/SOIC28/i);
    fireEvent.change(formView[0], { target: { value: "Test_Value", id: 1 } })
    fireEvent.keyUp(formView[0])
    expect(store.getState().app.formData?.data).toBeDefined();

    let updateBTN = screen.getByText(/Update/i);
    fireEvent.click(updateBTN, { target: { value: "Test_Value", id: 1 } })
    expect(store.getState().app.formData?.data).toBeDefined();
  });


})

describe('Update Button Click Testing', () => {
  it("Update Button Click event", () => {
    createCustomStore(initialState_FormData);
    renderApp();
    let updateBTN = screen.getByText(/Update/i);
    fireEvent.click(updateBTN, { target: { value: "Test_Value", id: 1 } })
    expect(store.getState().app.formData?.data).toBeDefined();
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