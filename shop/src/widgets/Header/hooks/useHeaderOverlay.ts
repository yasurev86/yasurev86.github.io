import { useActions, useAppSelector } from '@/shared/store/hooks';
import { selectorSearchIsOpened } from '@/shared/store/reducers/Search';
import { useEffect } from 'react';
import { selectorCatalogIsOpened } from '@/shared/store/reducers/Catalog';

export const useHeaderOverlay = () => {
	const isSearchOpened = useAppSelector(selectorSearchIsOpened);
	useEffect(() => {
		if (isSearchOpened) closeCatalog();
	}, [isSearchOpened]);

	const isCatalogOpened = useAppSelector(selectorCatalogIsOpened);
	useEffect(() => {
		if (isCatalogOpened) closeSearch();
	}, [isCatalogOpened]);

	const { closeSearch, closeCatalog } = useActions();

	const isOverlayActive = isSearchOpened || isCatalogOpened;

	const closeAll = () => {
		closeSearch();
		closeCatalog();
	};

	return { isOverlayActive, closeAll };
};
