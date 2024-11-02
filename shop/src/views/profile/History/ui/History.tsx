'use client';

import { FC, AllHTMLAttributes, useState } from 'react';
import c from './History.module.scss';
import clsx from 'clsx';
import { useGetProductsQuery } from '@/entities/Product';
import ProfileItemsGrid, {
	ProfileItemsGridSkeleton,
} from '@/shared/ui/components/ProfileItemsGrid';
import Pagination, { IPageRange } from '@/shared/ui/components/Pagination';
import { ConditionalLoadingBlock } from '@/shared/ui/components';
import { useAppSelector } from '@/shared/store/hooks';
import { selectorViewHistoryItems } from '@/shared/store/reducers/ViewHistory';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const History: FC<IProps> = ({ className, ...props }) => {
	const [pageRange, setPageRange] = useState<IPageRange>({
		start: 1,
		end: 1,
	});

	const history = useAppSelector(selectorViewHistoryItems);

	const { data: products, isLoading } = useGetProductsQuery(
		{
			ids: history,
			page: pageRange.start,
			pageSize: 10,
		},
		{
			skip: !history,
		},
	);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<ConditionalLoadingBlock
				isLoading={isLoading}
				data={products?.data}
				fallback={
					<ProfileItemsGridSkeleton
						count={history ? history.length : 20}
						className={c.grid}
					/>
				}
				content={products => (
					<ProfileItemsGrid className={c.grid} products={products} />
				)}
				emptyResult={<>{i18n('history_not_found')}</>}
			/>
			{history && products && products.pagination.pageCount > 1 && (
				<Pagination
					pageRange={pageRange}
					setPageRange={setPageRange}
					totalPages={products.pagination.pageCount}
				/>
			)}
		</div>
	);
};

export default History;
