import { RootState } from '@/shared/store/store';
import { createSelector } from 'reselect';

export const selectorComparison = (state: RootState) => state.ComparisonReducer;
export const selectorComparisonItems = createSelector(
	selectorComparison,
	comparison => comparison.items,
);
export const selectorComparisonItemsByCategory = createSelector(
	[
		selectorComparisonItems,
		(state: RootState, categoryId: number) => categoryId,
	],
	(items, categoryId) => items[categoryId],
);
export const selectorComparisonCategories = createSelector(
	selectorComparisonItems,
	items => Object.keys(items).map(Number),
);
export const selectorComparisonCategoriesAndCounts = createSelector(
	selectorComparisonItems,
	items => Object.entries(items).map(([key, values]) => [key, values.length]),
);
export const selectorComparisonItemsCount = createSelector(
	selectorComparisonItems,
	items => new Set(Object.values(items).flat()).size,
);
