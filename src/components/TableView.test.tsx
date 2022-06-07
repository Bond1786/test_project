import { render, screen, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { AppState, LOGIN_MODES, PAGE_TYPE } from '../redux/AppReducer';
import { AUTH_TYPE } from '../actions/Type';
import { Part } from '../actions/PartTypes';
import TableView from './TableView';
import { rootReducer } from '../redux/store';

const partlist: Part[] = [
  {
    "part_partdescriptionfileID": 1,
    "part_name": "AVRDA                                             "
  },
  {
    "part_partdescriptionfileID": 2,
    "part_name": "AVR32DA                                           "
  }
];

const initialState: AppState = {
  currentPage: PAGE_TYPE.LOGIN,
  loginMode: LOGIN_MODES.Guest,
  device: '',
  isConnected: false,
  dbParams: { type: AUTH_TYPE.WINDOW_AUTH, userName: "test_user", password: "password", dbUrl: "test_dbUrl", database: "test_database" },
  partSelected: '1',
  showPrRaisedDialog: true,
  hidePrRaisedDialog: false,
  isloading: false,
  isTableViewLoading: false,
  isPartListLoading: true,
  isloging: false,
  partList: partlist,
  login: {
    isSucessfull: true,
    token: "adc"
  },
  selectedTable: {
    tableInfo:{
      tableLabelText:"Test Table_view",
      tableName:"Test_table_view"
    } ,
    tableData: {
      columnMetas: [
        {
          "name": "part_boundary_scanID",
          "type": "Int"
        },
        {
          "name": "tdi_pad",
          "type": "NChar"
        },
        {
          "name": "tdo_pad",
          "type": "NChar"
        },
        {
          "name": "tms_pad",
          "type": "NChar"
        },
        {
          "name": "trst_pad",
          "type": "NChar"
        },
        {
          "name": "tck_pad",
          "type": "NChar"
        },
        {
          "name": "tck_frequency",
          "type": "Float"
        },
        {
          "name": "tck_levelID",
          "type": "Int"
        },
        {
          "name": "default_ic_value",
          "type": "NChar"
        },
        {
          "name": "part_partdescriptionfileID",
          "type": "Int"
        }
      ],
      rows: [
        {
          "part_boundary_scanID": 1,
          "tdi_pad": "                                                  ",
          "tdo_pad": "                                                  ",
          "tms_pad": "                                                  ",
          "trst_pad": "null",
          "tck_pad": "                                                  ",
          "tck_frequency": 0,
          "tck_levelID": 2,
          "default_ic_value": "                                                  ",
          "part_partdescriptionfileID": 1
        }
      ]
    },
    "rowIndex": 0
  }

};

let store = createStore(rootReducer);
const createCustomStore = () => {
  store = {
    ...store, ...store.getState().app = initialState,
    ...store.getState().app.login = { isSucessfull: true, token: "test_token" }
  }
  return store
}

beforeEach(() => {
  cleanup
});

const renderApp = (): RenderResult =>
  render(
    <Provider store={store}>
      <TableView />
    </Provider>
  );

afterEach(cleanup);

describe('TableView Controls Event Testing', () => {
  it("Tableview Control", () => {
    createCustomStore();
    renderApp();
    let partBoudaryID = screen.getByText(/tdi_pad/i);
    fireEvent.click(partBoudaryID, { value: 1 })
    fireEvent.change(partBoudaryID, { value: 1 })
    fireEvent.select(partBoudaryID, { value: 1 })
    expect(store.getState().app.selectedTable?.tableData?.rows).toBeDefined();

    let row = screen.getAllByRole(/row/i);
    fireEvent.select(row[0],{value:1})

  });
})
