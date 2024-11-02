import { RootState } from '@/shared/store/store';
import { createSelector } from 'reselect';

export const selectorViewHistory = (state: RootState) =>
	state.ViewHistoryReducer;
export const selectorViewHistoryItems = createSelector(
	selectorViewHistory,
	viewHistory => viewHistory.items,
);

export const selectorViewHistoryRecentlyItems = createSelector(
	selectorViewHistoryItems,
	items => items.slice(0, 12),
);
