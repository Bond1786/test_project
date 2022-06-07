import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import React from 'react';
import { PAGE_TYPE } from './redux/AppReducer';

test('Test - App with Login Page  ', () => {
    const { getByTestId } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    const login = getByTestId('udeApp');
    expect(login).toBeDefined();
});

test('Test - App Selection Page', () => {
    store.getState().app.currentPage = PAGE_TYPE.SELECTION
    const { getByTestId } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    const login = getByTestId('udeApp');
    expect(login).toBeDefined();
});

test('Test - App Edit Page', () => {
    store.getState().app.currentPage = PAGE_TYPE.EDIT
    const { getByTestId } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    const login = getByTestId('udeApp');
    expect(login).toBeDefined();
});
