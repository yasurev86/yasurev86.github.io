'use client';

import { FC, AllHTMLAttributes, Dispatch, SetStateAction } from 'react';
import c from './Pagination.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { IPageRange } from '../model/IPageRange';
import { getPageNumbers } from '../lib/getPageNumbers';

type IProps = {
	pageRange: IPageRange;
	setPageRange: Dispatch<SetStateAction<IPageRange>>;
	totalPages: number;
} & AllHTMLAttributes<HTMLDivElement>;
const Pagination: FC<IProps> = ({
	pageRange,
	totalPages,
	setPageRange,
	className,
	...props
}) => {
	const { start, end } = pageRange;
	const center = Math.round((start + end) / 2);

	const handlePageChange = (page: number) => {
		if (page !== start && page >= 1 && page <= totalPages) {
			setPageRange({ start: page, end: page });
		}
	};

	const pageNumbers = getPageNumbers(totalPages, center);

	return (
		<div
			className={clsx(c.wrapper, className)}
			{...props}
			title={start + '-' + end}
		>
			{start != 1 && (
				<button
					className={clsx(c.arrow, c.arrowPrev)}
					onClick={() => handlePageChange(start - 1)}
				>
					<Icon name={'arrow-left'} />
				</button>
			)}
			{pageNumbers.map(page => (
				<button
					key={page}
					className={clsx(
						c.btn,
						page >= start && page <= end && c['btn--active'],
					)}
					onClick={() => handlePageChange(page)}
				>
					{page}
				</button>
			))}
			{start != totalPages && (
				<button
					className={clsx(c.arrow, c.arrowNext)}
					onClick={() => handlePageChange(end + 1)}
				>
					<Icon name={'arrow-right'} />
				</button>
			)}
		</div>
	);
};

export default Pagination;
