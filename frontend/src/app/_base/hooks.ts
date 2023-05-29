import { Selector, useDispatch, useSelector, shallowEqual } from 'react-redux';
import type { AppState, AppThunkDispatch } from './store';

export const useAppDispatch: () => AppThunkDispatch = useDispatch;
export const useAppSelector = <S extends any>(selector: Selector<AppState, S>) => useSelector<AppState, S>(selector, shallowEqual);

