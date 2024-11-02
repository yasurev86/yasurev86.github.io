import React, { FC, ButtonHTMLAttributes } from 'react';
import c from './ComparisonBtn.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { useComparison } from '@/shared/store/hooks/useComparison';

type IProps = {
	activeClass?: string;
	product_id: number;
	categories: number[];
} & ButtonHTMLAttributes<HTMLButtonElement>;
const ComparisonBtn: FC<IProps> = ({
	product_id: id,
	categories,
	activeClass,
	className,
	onClick,
	...props
}) => {
	const { isInComparison, toggleComparison } = useComparison(id, categories);

	return (
		<button
			onClick={toggleComparison}
			className={clsx(
				c.wrapper,
				isInComparison && clsx(c.active, activeClass),
				className,
			)}
			{...props}
		>
			<Icon name={'balance'} />
			<span className={c.checkbox}>
				<Icon name={'checkbox'} />
			</span>
		</button>
	);
};

export default ComparisonBtn;
