'use client';

import { FC, AllHTMLAttributes, useState } from 'react';
import c from './Favourites.module.scss';
import clsx from 'clsx';
import ProfileItemsGrid, {
	ProfileItemsGridSkeleton,
} from '@/shared/ui/components/ProfileItemsGrid';
import { useGetProductsQuery } from '@/entities/Product';
import { Btn, Select, ConditionalLoadingBlock } from '@/shared/ui/components';
import {
	useGetFavouritesQuery,
	useRemoveManyFavouritesMutation,
} from '@/entities/Favourite';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const Favourites: FC<IProps> = ({ className, ...props }) => {
	const { data: favourites } = useGetFavouritesQuery(undefined);

	const [sort, setSort] = useState('price:asc');

	const { data: products, isLoading } = useGetProductsQuery(
		{ ids: favourites ? Object.keys(favourites).map(Number) : [], sort },
		{
			skip: !favourites || !Object.keys(favourites).length,
		},
	);

	const [removeItems, removeItemsResult] = useRemoveManyFavouritesMutation();

	const [selectedItems, setSelectedItems] = useState<number[]>([]);

	const handleSelect = (isChecked: boolean, id: number) =>
		setSelectedItems(cur =>
			isChecked ? [...cur, id] : cur.filter(el => el !== id),
		);

	const selectAll = () => {
		if (!favourites) return;

		setSelectedItems(Object.keys(favourites).map(Number));
	};

	const unSelectAll = () => {
		setSelectedItems([]);
	};

	const deleteHandler = () => {
		if (!favourites) return;

		setSelectedItems([]);
		removeItems(selectedItems.map(id => favourites[id]));
	};

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.header}>
				<Select
					className={c.sort}
					value={sort}
					onChange={type => setSort(type)}
					disabled={!favourites || !Object.keys(favourites).length}
					placeholder={i18n('sort')}
					items={{
						'price:asc': i18n('price:asc'),
						'price:desc': i18n('price:desc'),
						'createdAt:desc': i18n('createdAt:desc'),
						'rating:desc': i18n('rating:desc'),
					}}
				/>
				{products?.data &&
					favourites &&
					!!Object.keys(favourites).length && (
						<div className={c.selection}>
							{selectedItems.length == products?.data.length ? (
								<Btn
									use={'tertiary-accent'}
									onClick={unSelectAll}
									size={'medium'}
								>
									{i18n('reset_selected')}
								</Btn>
							) : (
								<Btn
									use={'tertiary-accent'}
									onClick={selectAll}
									size={'medium'}
								>
									{i18n('select_all')}
								</Btn>
							)}
							<span className={c.selection_count}>
								{i18n(
									'selected_products_count',
									selectedItems.length,
								)}
							</span>
						</div>
					)}
				<Btn
					icon={'trash'}
					use={'tertiary'}
					disabled={selectedItems.length == 0}
					size={'medium'}
					onClick={deleteHandler}
				>
					{i18n('delete')}
				</Btn>
			</div>
			<ConditionalLoadingBlock
				isEmpty={
					!isLoading && favourites && !Object.keys(favourites).length
				}
				isLoading={isLoading}
				data={products?.data}
				fallback={
					<ProfileItemsGridSkeleton
						count={favourites ? Object.keys(favourites).length : 4}
						className={c.grid}
						variant={'favourites'}
					/>
				}
				content={products => (
					<ProfileItemsGrid
						className={c.grid}
						products={products}
						checkboxValue={data =>
							selectedItems.indexOf(data.id) !== -1
						}
						checkboxSetValue={(value, data) =>
							handleSelect(value, data.id)
						}
						variant={'favourites'}
					/>
				)}
				emptyResult={
					<p style={{ margin: '1em 0' }}>
						{i18n('favourites_not_found')}
					</p>
				}
			/>
		</div>
	);
};

export default Favourites;
