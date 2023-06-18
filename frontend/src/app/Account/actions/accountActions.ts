import { createAction } from '@reduxjs/toolkit';
import { User } from 'app/_base/models/user';

const ACTION_PREFIX = 'ACCOUNT';

export const accountActions = {
    fetchBegin: createAction(`${ACTION_PREFIX}_FETCH_BEGIN`),
    fetchSuccess: createAction<User>(`${ACTION_PREFIX}_FETCH_SUCCESS`),
    fetchFailure: createAction<string>(`${ACTION_PREFIX}_FETCH_FAILURE`),
    clearForm: createAction(`${ACTION_PREFIX}_CLEAR_FORM`),
    resetError: createAction(`${ACTION_PREFIX}_RESET_ERROR`)
};
