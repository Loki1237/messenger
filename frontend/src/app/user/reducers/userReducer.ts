import { createReducer } from '@reduxjs/toolkit';
import { User } from 'app/_base/models/user';
import { userActions } from '../actions/userActions';

export interface UserState {
    isLoading: boolean;
    error: string;
    data: User;
}

const initialState: UserState = {
    isLoading: false,
    error: null,
    data: null
};

export const userReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(userActions.fetchRequest, (state) => ({
            ...state,
            isLoading: true,
            error: null
        }))
        .addCase(userActions.fetchSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload
        }))
        .addCase(userActions.fetchFailure, (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload
        }))
        .addCase(userActions.resetError, (state) => ({
            ...state,
            error: null
        }))
        .addCase(userActions.clearForm, () => initialState)
        .addDefaultCase((state) => state)
);
