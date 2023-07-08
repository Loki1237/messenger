import axios, { AxiosError } from 'axios';
import { AppThunk } from 'app/_base/store';
import { SearchResult, User } from 'app/_base/models';
import { contactActions } from '../actions/contactActions';

export const fetchContacts = (): AppThunk => async (dispatch) => {
    dispatch(contactActions.fetchBegin());

    try {
        const response = await axios.get<SearchResult<User>>('/api/user/contacts?offset=0'); // TODO: offset
        dispatch(contactActions.fetchSuccess(response.data));
    } catch (e: unknown) {
        const error = e as AxiosError<string>;
        dispatch(contactActions.fetchFailure(error.response.data));
    }
};
