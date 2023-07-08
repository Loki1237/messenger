import axios, { AxiosError } from 'axios';
import { AppThunk } from 'app/_base/store';
import { User } from 'app/_base/models';
import { accountActions } from '../actions/accountActions';
import { AccountFields } from '../models/accountModels'

const createRequest = (type: 'login' | 'signup') => (data?: AccountFields): AppThunk => async (dispatch) => {
    dispatch(accountActions.fetchBegin());

    try{
        const response = await axios.post<User>(`/api/user/${type}`, data);
        dispatch(accountActions.fetchSuccess(response.data));
    } catch (e: unknown) {
        const error = e as AxiosError<string>;
        dispatch(accountActions.fetchFailure(error.response.data));
    }
};

export const fetchLogin = (data?: AccountFields) => createRequest('login')(data);

export const fetchSignup = (data: AccountFields) => createRequest('signup')(data);
