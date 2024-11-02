import React, { FC, AllHTMLAttributes } from 'react';
import { cartModalName } from '@/features/modals';
import NavBtn from '../NavBtn/NavBtn';
import { useAppSelector } from '@/shared/store/hooks';
import { selectorCartItemsCount } from '@/shared/store/reducers/Cart';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const CartNavBtn: FC<IProps> = ({ className, ...props }) => {
	const count = useAppSelector(selectorCartItemsCount);

	return <NavBtn icon={'bag'} count={count} modal={cartModalName} />;
};

export default CartNavBtn;
