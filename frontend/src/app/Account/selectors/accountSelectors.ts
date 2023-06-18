import { AppState } from 'app/_base/store';

export const isLoadingSelector = (state: AppState) => state.account.isLoading;

export const errorSelector = (state: AppState) => state.account.error;

export const userSelector = (state: AppState) => state.account.data;
