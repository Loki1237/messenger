import { AppState } from 'app/_base/store';

export const loadStatusSelector = (state: AppState) => state.account.loadStatus;

export const errorSelector = (state: AppState) => state.account.error;

export const userSelector = (state: AppState) => state.account.data;
