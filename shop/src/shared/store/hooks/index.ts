import { AppDispatch, RootState } from '../store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from './useModal';
export * from './useActions';
export * from './useCart';
export * from './useComparison';
