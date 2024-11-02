'use client';

import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import clsx from 'clsx';
import c from './HeaderSearch.module.scss';
import Item from './Item/Item';
import ItemSkeleton from './Item/ItemSkeleton';
import HeaderSearchBtn from './Btn/Btn';
import HeaderSearchIcon from './Icon/Icon';
import HeaderSearchInput from './Input/Input';
import { ISearchItem, useGetSearchItemsQuery } from '@/entities/Search';
import { useActions, useAppSelector } from '@/shared/store/hooks';
import {
	StyledSimpleBar,
	Icon,
	InViewTrigger,
	ConditionalLoadingBlock,
} from '@/shared/ui/components';
import { selectorSearchHistoryItems } from '@/shared/store/reducers/SearchHistory';
import { selectorSearchIsOpened } from '@/shared/store/reducers/Search/selectors';

const pageSize = 10;

type IProps = {} & HTMLAttributes<HTMLDivElement>;
const HeaderSearch: FC<IProps> = ({ className, ...props }) => {
	const [query, setQuery] = useState('');

	const searchHistoryItems = useAppSelector(selectorSearchHistoryItems);
	const isActive = useAppSelector(selectorSearchIsOpened) && query.length > 0;

	const { closeSearch } = useActions();

	const [items, setItems] = useState<ISearchItem[]>([]);
	const [page, setPage] = useState<number>(1);

	const {
		data: results,
		isFetching,
		isUninitialized,
	} = useGetSearchItemsQuery(
		{
			query,
			page,
			pageSize,
			recently: searchHistoryItems,
		},
		{
			skip: !isActive || query.length == 0,
		},
	);

	useEffect(() => {
		if (!isFetching && !isUninitialized)
			setItems(cur => [...cur, ...(results?.data || [])]);
	}, [isFetching]);

	useEffect(() => {
		if (query.length == 0) {
			closeSearch();
		}
	}, [query]);

	useEffect(() => {
		if (!isActive) {
			setQuery('');
		}
	}, [isActive]);

	return (
		<div
			className={clsx(className, isActive && c['_is-active'], c.wrapper)}
			{...props}
		>
			<div className={c.inner}>
				<HeaderSearchIcon />
				<HeaderSearchInput
					query={query}
					setQuery={setQuery}
					onChange={() => {
						if (!isUninitialized) {
							setPage(1);
							setItems([]);
						}
					}}
				/>
				{!!query.length && (
					<button className={c.closeBtn} onClick={() => setQuery('')}>
						<Icon name={'close'} />
					</button>
				)}
				{isActive && (
					<div className={c.results}>
						<StyledSimpleBar className={c.scrollContainer}>
							<div>
								<ConditionalLoadingBlock
									isLoading={isFetching}
									data={items}
									fallback={
										<>
											{!!items.length &&
												items.map(({ id, ...data }) => (
													<Item
														{...data}
														isRecent={
															searchHistoryItems.indexOf(
																id,
															) !== -1
														}
														id={id}
														key={id}
													/>
												))}
											{Array.from({
												length: pageSize,
											}).map((_, ind) => (
												<ItemSkeleton key={ind} />
											))}
										</>
									}
									content={(items: ISearchItem[]) => (
										<>
											{items.map(({ id, ...data }) => (
												<Item
													{...data}
													isRecent={
														searchHistoryItems.indexOf(
															id,
														) !== -1
													}
													id={id}
													key={id}
												/>
											))}
											{results?.pagination &&
												results.pagination.page <
													results.pagination
														.pageCount && (
													<InViewTrigger
														onChange={inView => {
															if (
																inView &&
																!isFetching &&
																results &&
																results
																	.pagination
																	.pageCount >
																	results
																		.pagination
																		.page
															) {
																setPage(
																	cur =>
																		cur + 1,
																);
															}
														}}
													/>
												)}
										</>
									)}
									emptyResult={
										<div style={{ margin: '0 10px' }}>
											Ничего не найдено...
										</div>
									}
								/>
							</div>
						</StyledSimpleBar>
					</div>
				)}
			</div>
			<HeaderSearchBtn />
		</div>
	);
};

export default HeaderSearch;
