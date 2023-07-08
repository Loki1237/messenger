import { AppState } from 'app/_base/store';

export const loadStatusSelector = (state: AppState) => state.contacts.loadStatus;

export const errorSelector = (state: AppState) => state.contacts.error;

export const contactsSelector = (state: AppState) => state.contacts.data;
