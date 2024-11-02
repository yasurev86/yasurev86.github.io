'use client';

import React, { FC, AllHTMLAttributes, useState } from 'react';
import c from './Catalog.module.scss';
import Filters, { IFilter } from './Filters';
import Product, { IProduct, useGetProductsQuery } from '@/entities/Product';
import Pagination, { IPageRange } from '@/shared/ui/components/Pagination';
import { ConditionalLoadingBlock, Btn, Select } from '@/shared/ui/components';
import { ProductSkeleton } from '@/entities/Product';
import LoadMoreCard from './LoadMoreCard/LoadMoreCard';
import { useToggle, useFreezeScroll } from '@/shared/hooks';
import Breadcrumbs, {
	IBreadcrumbsItem,
} from '@/shared/ui/components/Breadcrumbs';
import { RecentlySection } from '@/shared/ui/sections';
import { ICategory } from '@/entities/Category';
import { i18n } from '@/shared/i18n';

const perPage = () => {
	if (typeof window !== 'undefined') {
		const ww = window.innerWidth;

		if (ww >= 768) return 24;
		return 8;
	}
	return 24;
};

type IProps = {
	producer: number | undefined;
	filters: { filters: IFilter[]; categories: ICategory[] };
	categories?: number[];
	breadcrumbs?: IBreadcrumbsItem[];
	categoryName?: string;
} & AllHTMLAttributes<HTMLDivElement>;
const Catalog: FC<IProps> = ({
	producer,
	filters,
	categories = [],
	breadcrumbs = [],
	className,
	categoryName,
}) => {
	const [pageRange, setPageRange] = useState<IPageRange>({
		start: 1,
		end: 1,
	});

	const {
		isActive: isFiltersOpened,
		enable: enableFilters,
		disable: disableFilters,
	} = useToggle();

	const { freezeScroll, unfreezeScroll } = useFreezeScroll();

	const enableFiltersModal = () => {
		enableFilters();
		freezeScroll();
	};

	const disableFiltersModal = () => {
		disableFilters();
		unfreezeScroll();
	};

	const [selectedFilters, setSelectedFilters] = useState<object | null>(null);
	const [sort, setSort] = useState('createdAt:desc');

	const { data, isFetching } = useGetProductsQuery(
		{
			limit: perPage() * (pageRange.end - pageRange.start + 1) - 1,
			start: (perPage() - 1) * (pageRange.start - 1),
			filters: producer
				? { ...selectedFilters, producer: [producer] }
				: selectedFilters,
			sort,
			categories,
		},
		{
			skip: !selectedFilters,
		},
	);

	const { data: products, pagination } = data || {};

	return (
		<>
			<Breadcrumbs
				items={[
					{ link: '/catalog', name: i18n('catalog') },
					...breadcrumbs,
				]}
			/>
			<div className={c.header}>
				<h1 className={c.caption}>{categoryName || i18n('catalog')}</h1>
				<div className={c.actions}>
					<Btn
						className={c.filtersBtn}
						onClick={enableFiltersModal}
						icon={'filter'}
						size={'medium'}
					>
						{i18n('filters')}
					</Btn>
					<Select
						className={c.sort}
						placeholder={i18n('sort')}
						value={sort}
						onChange={value => setSort(value)}
						items={{
							'price:asc': i18n('price:asc'),
							'price:desc': i18n('price:desc'),
							'createdAt:desc': i18n('createdAt:desc'),
							'rating:desc': i18n('rating:desc'),
						}}
					/>
				</div>
			</div>
			<div className={c.container}>
				<Filters
					categories={filters.categories}
					items={filters.filters}
					isOpened={isFiltersOpened}
					disable={disableFiltersModal}
					setFilters={(filters: object) =>
						setSelectedFilters(filters)
					}
				/>
				<div className={c.main}>
					<div className={c.products}>
						<ConditionalLoadingBlock
							isLoading={isFetching || !selectedFilters}
							data={products}
							fallback={
								<>
									{pageRange.start != pageRange.end &&
										products &&
										!!products.length && (
											<>
												{products.map(data => (
													<Product
														{...data}
														key={data.id}
													/>
												))}
											</>
										)}
									{Array.from({
										length:
											perPage() *
											(pageRange.end -
												pageRange.start +
												(pageRange.start !=
													pageRange.end &&
												products &&
												!!products.length
													? 0
													: 1)),
									}).map((_, ind) => (
										<ProductSkeleton key={ind} />
									))}
								</>
							}
							content={(items: IProduct[]) => (
								<>
									{items &&
										items.map(data => (
											<Product {...data} key={data.id} />
										))}
									{pagination &&
										pagination.total >
											pagination.start +
												pagination.limit && (
											<LoadMoreCard
												productsCount={
													pagination.total -
													(pagination.start +
														pagination.limit)
												}
												onClick={() => {
													setPageRange(cur => ({
														...cur,
														end: cur.end + 1,
													}));
												}}
											/>
										)}
								</>
							)}
							emptyResult={
								<h3
									style={{
										textAlign: 'center',
										margin: '20px 0',
										gridColumn: '1 / -1',
									}}
								>
									{i18n('catalog_products_not_found')}
								</h3>
							}
						/>
					</div>
					{pagination &&
						Math.ceil(pagination.total / pagination.limit) > 1 && (
							<Pagination
								className={c.pagination}
								pageRange={pageRange}
								setPageRange={setPageRange}
								totalPages={Math.ceil(
									pagination.total / pagination.limit,
								)}
							/>
						)}
				</div>
			</div>
			<RecentlySection />
		</>
	);
};

export default Catalog;
