import { render, screen, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import LoginForm from './LoginForm';
import { rootReducer } from '../redux/store';
import { AUTH_TYPE, DBParam } from '../actions/Type';

let store = createStore(rootReducer);
beforeEach(() => {
    store = createStore(rootReducer)
});

const renderApp = (): RenderResult =>
    render(
        <Provider store={store}>
            <LoginForm />
        </Provider>
    );

afterEach(cleanup);


describe('Login Form All Controls Testing', () => {
    it('Test - Setting User name ', () => {
        renderApp();

        const username = screen.getByTestId(/username/i);
        expect(username.id).toEqual("username");
    });

    it('Test - Setting password  ', () => {
        renderApp();
        let password = screen.getByTestId(/password/i);
        expect(password.id).toEqual("password");
    });

    it("Test - Setting serverUrl", () => {
        renderApp();
        let serverUrl = screen.getByTestId(/serverUrl/i);
        expect(serverUrl.id).toEqual("serverUrl");

    })


    it("Test - Setting database", () => {
        renderApp();
        let database: HTMLElement = screen.getByTestId(/database/i);
        expect(database.id).toEqual("database");

    })

    it("Test - Setting authenticationmode", () => {
        renderApp();
        let authenticationmode = screen.getByTestId(/authenticationmode/i);
        expect(authenticationmode.id).toEqual("authenticationmode");

    })
})


describe('Login Form Login Button fire Event', () => {

    it('Test - Setting User name ', () => {
        renderApp();

        const username = screen.getByTestId(/username/i);
        fireEvent.change(username, { target: { value: "test user" } });

        const buttonEl = screen.getByTestId(/loginBtn/i);
        fireEvent.click(buttonEl);
        expect(store.getState().app.dbParams.userName).toEqual("test user");
    });

    it('Test - Setting password  ', () => {
        renderApp();

        let password = screen.getByTestId(/password/i);
        fireEvent.change(password, { target: { value: "Test_pasword" } });

        const buttonEl = screen.getByTestId(/loginBtn/i);
        fireEvent.click(buttonEl);
        expect(store.getState().app.dbParams.password).toEqual("Test_pasword");
    });

    it("Test - Setting serverUrl", () => {
        renderApp();
        let serverUrl = screen.getByTestId(/serverUrl/i);
        fireEvent.change(serverUrl, { target: { value: "Test_serverUrl" } });

        const buttonEl = screen.getByTestId(/loginBtn/i);
        fireEvent.click(buttonEl);
        expect(store.getState().app.dbParams.dbUrl).toEqual("Test_serverUrl");
    })


    it("Test - Setting database", () => {
        renderApp();
        let database: HTMLElement = screen.getByTestId(/database/i);

        fireEvent.change(database, { target: { value: "Test_DataBase" } });

        const buttonEl = screen.getByTestId(/loginBtn/i);
        fireEvent.click(buttonEl);
        expect(store.getState().app.dbParams.database).toEqual("Test_DataBase");
    })

    it("Test - Setting authenticationmode", () => {
        renderApp();
        let authenticationmode = screen.getByTestId(/authenticationmode/i);
        fireEvent.change(authenticationmode, { target: { value: '11' } });
    })
})

describe('Login Form Reset Button fire Event', () => {
    test('Test - Reset Button fire Event', () => {
        renderApp();
        const DEFAULT_GUEST_LOGIN: DBParam = {
            database: 'test_db',
            password: '',
            dbUrl: 'test_url',
            userName: 'test_user',
            type: AUTH_TYPE.SQL_AUTH
        };
        const resetBtn = screen.getByText(/Reset/i);
        fireEvent.click(resetBtn);
        expect(store.getState().app.dbParams.dbUrl).toEqual(DEFAULT_GUEST_LOGIN.dbUrl);
    });
})


