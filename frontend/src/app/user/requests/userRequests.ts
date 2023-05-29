import axios, { AxiosError } from 'axios';
import { AppThunk } from 'app/_base/store';
import { User } from 'app/_base/models/user';
import { userActions } from '../actions/userActions';
import { UserFields } from '../fields/userFields'

export const fetchUserRequest = (type: 'login' | 'signup', data: UserFields): AppThunk => async (dispatch) => {
        dispatch(userActions.fetchRequest());

        try{
            const response = await axios.post<User>(`/api/user/${type}`, data);
            dispatch(userActions.fetchSuccess(response.data));
        } catch (e: unknown) {
            const error = e as AxiosError<string>;
            dispatch(userActions.fetchFailure(error.response.data));
        }
};
