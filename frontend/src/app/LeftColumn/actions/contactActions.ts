import { createAction } from '@reduxjs/toolkit';
import { SearchResult, User } from 'app/_base/models';

const ACTION_PREFIX = 'CONTACTS';

export const contactActions = {
    fetchBegin: createAction(`${ACTION_PREFIX}_FETCH_BEGIN`),
    fetchSuccess: createAction<SearchResult<User>>(`${ACTION_PREFIX}_FETCH_SUCCESS`),
    fetchFailure: createAction<string>(`${ACTION_PREFIX}_FETCH_FAILURE`),
    clearForm: createAction(`${ACTION_PREFIX}_CLEAR_FORM`),
    resetError: createAction(`${ACTION_PREFIX}_RESET_ERROR`)
};
