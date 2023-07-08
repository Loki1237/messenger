import { createReducer } from '@reduxjs/toolkit';
import { LoadStatus, User } from 'app/_base/models';
import { accountActions } from '../actions/accountActions';

interface AccountState {
    loadStatus: LoadStatus;
    error: string;
    data: User;
}

const initialState: AccountState = {
    loadStatus: 'IDLE',
    error: null,
    data: null
};

export const accountReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(accountActions.fetchBegin, (state) => ({
            ...state,
            loadStatus: 'IN_PROGRESS',
            error: null
        }))
        .addCase(accountActions.fetchSuccess, (state, action) => ({
            ...state,
            loadStatus: "SUCCESS",
            data: action.payload
        }))
        .addCase(accountActions.fetchFailure, (state, action) => ({
            ...state,
            loadStatus: 'FAILURE',
            error: action.payload
        }))
        .addCase(accountActions.resetError, (state) => ({
            ...state,
            error: null
        }))
        .addCase(accountActions.clearForm, () => initialState)
        .addDefaultCase((state) => state)
);
