import { createReducer } from '@reduxjs/toolkit';
import { LoadStatus, SearchResult, User } from 'app/_base/models';
import { contactActions } from '../actions/contactActions';

interface ContactState {
    loadStatus: LoadStatus;
    error: string;
    data: SearchResult<User>;
}

const initialState: ContactState = {
    loadStatus: 'IDLE',
    error: null,
    data: null
};

export const contactReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(contactActions.fetchBegin, (state) => ({
            ...state,
            loadStatus: 'IN_PROGRESS',
            error: null
        }))
        .addCase(contactActions.fetchSuccess, (state, action) => ({
            ...state,
            loadStatus: "SUCCESS",
            data: action.payload
        }))
        .addCase(contactActions.fetchFailure, (state, action) => ({
            ...state,
            loadStatus: 'FAILURE',
            error: action.payload
        }))
        .addCase(contactActions.resetError, (state) => ({
            ...state,
            error: null
        }))
        .addCase(contactActions.clearForm, () => initialState)
        .addDefaultCase((state) => state)
);
