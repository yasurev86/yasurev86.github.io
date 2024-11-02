import React, { FC, AllHTMLAttributes } from 'react';
import { compareListModalName } from '@/features/modals';
import NavBtn from '../NavBtn/NavBtn';
import { useAppSelector } from '@/shared/store/hooks';
import { selectorComparisonItemsCount } from '@/shared/store/reducers/Comparison';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const ComparisonNavBtn: FC<IProps> = ({ className, ...props }) => {
	const count = useAppSelector(selectorComparisonItemsCount);

	return (
		<NavBtn
			modal={compareListModalName}
			icon={'balance'}
			count={count || undefined}
		/>
	);
};

export default ComparisonNavBtn;
