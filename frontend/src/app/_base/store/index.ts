import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, AnyAction } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { accountReducer } from 'app/Account/reducers/accountReducer';

const rootReducer = combineReducers({
    account: accountReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;
export type AppThunkDispatch = ThunkDispatch<AppState, AppDispatch, AnyAction>;
