import { RootState } from '@/shared/store/store';
import { createSelector } from 'reselect';

export const selectorCatalog = (state: RootState) => state.CatalogReducer;
export const selectorCatalogIsOpened = createSelector(
	selectorCatalog,
	search => search.isOpened,
);
