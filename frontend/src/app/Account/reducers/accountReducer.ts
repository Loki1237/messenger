import { createReducer } from '@reduxjs/toolkit';
import { User } from 'app/_base/models/user';
import { accountActions } from '../actions/accountActions';

interface AccountState {
    isLoading: boolean;
    error: string;
    data: User;
}

const initialState: AccountState = {
    isLoading: false,
    error: null,
    data: null
};

export const accountReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(accountActions.fetchBegin, (state) => ({
            ...state,
            isLoading: true,
            error: null
        }))
        .addCase(accountActions.fetchSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload
        }))
        .addCase(accountActions.fetchFailure, (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload
        }))
        .addCase(accountActions.resetError, (state) => ({
            ...state,
            error: null
        }))
        .addCase(accountActions.clearForm, () => initialState)
        .addDefaultCase((state) => state)
);
