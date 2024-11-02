import React, { FC, AllHTMLAttributes } from 'react';
import NavBtn from '../NavBtn/NavBtn';
import { useGetFavouritesQuery } from '@/entities/Favourite';
import { useAppSelector } from '@/shared/store/hooks';
import { selectorUserIsLogged } from '@/shared/store/reducers/User';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const FavouritesNavBtn: FC<IProps> = ({ className, ...props }) => {
	const isLogged = useAppSelector(selectorUserIsLogged);
	const { data } = useGetFavouritesQuery(undefined, {
		skip: !isLogged,
	});

	if (!isLogged) return null;

	return (
		<NavBtn
			link={'/profile/favourites'}
			icon={'heart'}
			count={data ? Object.keys(data).length || undefined : undefined}
		/>
	);
};

export default FavouritesNavBtn;
