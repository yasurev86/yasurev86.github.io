'use client';

import { FC, AllHTMLAttributes } from 'react';
import c from './Sidebar.module.scss';
import clsx from 'clsx';
import Item from './Item/Item';
import UserCard from '@/entities/User/ui/UserCard/UserCard';
import { useLogout } from '@/shared/hooks/useLogout';
type IProps = { activePage: string } & AllHTMLAttributes<HTMLDivElement>;
const Sidebar: FC<IProps> = ({ activePage, className, ...props }) => {
	const logout = useLogout();

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<UserCard className={c.userCard} />
			<Item
				icon={'box-search'}
				name={'Мои заказы'}
				href={'/profile/orders'}
				isSelected={activePage == 'orders'}
			/>
			<Item
				icon={'heart'}
				name={'Избранные'}
				href={'/profile/favourites'}
				isSelected={activePage == 'favourites'}
			/>
			<Item
				icon={'history'}
				name={'Історія товарів'}
				href={'/profile/history'}
				isSelected={activePage == 'history'}
			/>
			<Item
				icon={'review'}
				name={'Мої відгуки'}
				href={'/profile/reviews'}
				isSelected={activePage == 'reviews'}
			/>
			<hr className={c.divider} />
			<Item icon={'exit'} name={'Вихід'} onClick={logout} />
		</div>
	);
};

export default Sidebar;
