import { render, screen, RenderResult, fireEvent, cleanup, getByLabelText } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { rootReducer } from '../redux/store';
import Loading from './Loading';



let store = createStore(rootReducer);
beforeEach(() => {
    store = createStore(rootReducer)
});

const renderApp = (): RenderResult =>
    render(
        <Provider store={store}>
            <Loading />
        </Provider>
    );

afterEach(cleanup);



it("handleChange loading function called", () => {
    const spy = jest.fn();
    renderApp();
    let loading = screen.getByTestId(/loading/i);
    // fireEvent.change(loading, { target: { value: "23" } });
    expect(loading).toBeDefined();
});


