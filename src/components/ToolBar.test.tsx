import { render, screen, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import ToolBar from './ToolBar';
import { AppState, LOGIN_MODES, PAGE_TYPE } from '../redux/AppReducer';
import { AUTH_TYPE } from '../actions/Type';
import { rootReducer } from '../redux/store';
import { Part } from '../actions/PartTypes';

const partlist:Part[] = [
    {
        "part_partdescriptionfileID": 1,
        "part_name": "AVRDA                                             "
    },
    {
        "part_partdescriptionfileID": 2,
        "part_name": "AVR32DA                                           "
    }
];

const initialState_noData: AppState = {
    currentPage: PAGE_TYPE.LOGIN,
    loginMode: LOGIN_MODES.Guest,
    device: '',
    isConnected: false,
    dbParams: { type: AUTH_TYPE.WINDOW_AUTH, userName: "test_user", password: "password", dbUrl: "test_dbUrl", database: "test_database" },

};

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
    isTreeviewLoading: false,
    isTableViewLoading: false,
    isPartListLoading: true,
    isloging: false,
    partList: partlist,
    login: {
        isSucessfull: true,
        token: "adc"
    }
};


let store = createStore(rootReducer);
let store_1 = createStore(rootReducer);
const createCustomStore = (initState: AppState) => {
    store_1 = {
        ...store_1, ...store_1.getState().app = initialState,
        ...store_1.getState().app.login = { isSucessfull: true, token: "test_token" }
    }
    return store
}

beforeEach(() => {
    cleanup
});

const renderApp = (): RenderResult =>
    render(
        <Provider store={store}>
            <ToolBar />
        </Provider>
    );
const renderApp_noData = (): RenderResult =>
    render(
        <Provider store={store_1}>
            <ToolBar />
        </Provider>
    );

afterEach(cleanup);

describe('Toolbar Controls Testing', () => {
    it("partName Control", () => {
        renderApp();
        let loading = screen.getByTestId(/toolbarmenu/i);
        expect(loading.id).toEqual("toolbarmenu")
    });
    // it("menu button", () => {
    //     renderApp();
    //     let menu = screen.getByTestId(/menu/i);
    //     expect(menu.id).toEqual("menu")
    // });
    // it("Logout PR button", () => {
    //     renderApp();
    //     let logout = screen.getByTestId(/logout/i);
    //     expect(logout.id).toEqual("logout")
    // }); 
})

// describe('Toolbar Controls Event Testing', () => {
//     it("partComboBox Control", () => {
//         renderApp();
//         let partName = screen.getByTestId(/partComboBox/i);
//         fireEvent.change(partName, { target: { value: 1 } });
//         expect(store.getState().app.partSelected).toEqual("1");
//     });

//     it("menu button", () => {
//         renderApp();
//         let menu = screen.getByTestId(/menu/i);
//         fireEvent.click(menu);
//         expect(store.getState().app.currentPage).toEqual(PAGE_TYPE.SELECTION);
//     });

//     it("Logout PR button", () => {
//         renderApp();
//         let logout = screen.getByTestId(/logout/i);
//         fireEvent.click(logout);
//     });

//     it("Logout PR button", () => {
//         renderApp();
//         let logout = screen.getByTestId(/logout/i);
//         fireEvent.click(logout);
//     });

//     it("Logout PR button", () => {
//         renderApp();
//         let logout = screen.getByTestId(/logout/i);
//         fireEvent.click(logout);
//     });
// })

// describe('Toolbar Controls Event Testing', () => {
//     it("partComboBox Control", () => {
//         createCustomStore(initialState)
//         renderApp_noData();
//         let partName = screen.getByTestId(/partComboBox/i);
//         fireEvent.change(partName, { target: { value: 1 } });
//         expect(store.getState().app.partSelected).toEqual("1");
//     });
// })
