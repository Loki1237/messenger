export { shallowEqual } from 'react-redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppState, AppThunkDispatch } from './store';

export const useAppDispatch: () => AppThunkDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

