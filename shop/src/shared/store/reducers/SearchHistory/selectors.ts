import { RootState } from '@/shared/store/store';
import { createSelector } from 'reselect';

export const selectorSearchHistory = (state: RootState) =>
	state.SearchHistoryReducer;
export const selectorSearchHistoryItems = createSelector(
	selectorSearchHistory,
	searchHistory => searchHistory.items,
);
