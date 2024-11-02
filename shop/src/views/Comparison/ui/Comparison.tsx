'use client';

import React, { FC, AllHTMLAttributes } from 'react';
import c from './Comparison.module.scss';
import clsx from 'clsx';
import {
	Breadcrumbs,
	ConditionalLoadingBlock,
	ToggleInput,
} from '@/shared/ui/components';
import { RecentlySection } from '@/shared/ui/sections';
import { useGetProductsQuery } from '@/entities/Product';
import { TPropertyType } from '@/entities/Category';
import { useAppSelector } from '@/shared/store/hooks';
import { Table } from './Table';
import { mapProperties } from '../lib/mapProperties';
import { IDetailedProductBeforePropertiesMap } from '../model/IDetailedProductBeforePropertiesMap';
import { selectorComparisonItemsByCategory } from '@/shared/store/reducers/Comparison';
import { useToggle } from '@/shared/hooks';
import { i18n } from '@/shared/i18n';

type IProps = {
	category: { id: number; name: string };
	properties: { [id: number]: { name: string; type: TPropertyType } };
} & AllHTMLAttributes<HTMLDivElement>;
const Comparison: FC<IProps> = ({ className, properties, category }) => {
	const { isActive: flagOnlyDiff, toggle: setFlagOnlyDiff } = useToggle();

	const items = useAppSelector(state =>
		selectorComparisonItemsByCategory(state, category.id),
	);

	const { data, isLoading } = useGetProductsQuery({
		ids: items,
		detailed: true,
	});

	const products = mapProperties(
		data?.data as IDetailedProductBeforePropertiesMap[],
	);

	if (!category || !items) return null;

	return (
		<div className={clsx(c.wrapper, className)}>
			<Breadcrumbs
				items={[
					{ name: i18n('comparison') },
					{ name: category.name, link: '' },
				]}
			/>
			<h1 className={c.caption}>{category.name}</h1>
			<ToggleInput
				onChange={e => setFlagOnlyDiff(e.target.checked)}
				defaultChecked={flagOnlyDiff}
			>
				{i18n('only_diff')}
			</ToggleInput>
			<ConditionalLoadingBlock
				isLoading={isLoading}
				data={products}
				content={products => (
					<Table
						properties={properties}
						products={products}
						count={items ? items.length : 5}
						className={c.table}
						onlyDiff={flagOnlyDiff}
					/>
				)}
				emptyResult={<>{i18n('comparison_products_not_found')}</>}
			/>
			<RecentlySection />
		</div>
	);
};

export default Comparison;
