'use client';

import React, { FC, AllHTMLAttributes } from 'react';
import { ProductsSection } from '@/shared/ui/sections';
import { selectorViewHistoryRecentlyItems } from '@/shared/store/reducers/ViewHistory';
import { useAppSelector } from '@/shared/store/hooks';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const RecentlySection: FC<IProps> = ({ className, ...props }) => {
	const ids = useAppSelector(selectorViewHistoryRecentlyItems);

	if (!ids || ids.length == 0) return null;

	return (
		<ProductsSection caption={i18n('recently_section_caption')} ids={ids} />
	);
};

export default RecentlySection;
