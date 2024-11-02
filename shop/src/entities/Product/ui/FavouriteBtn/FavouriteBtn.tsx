import React, { FC, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { useFavourite } from '@/entities/Favourite';
import c from './FavouriteBtn.module.scss';

type IProps = {
	activeClass?: string;
	product_id: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const FavouriteBtn: FC<IProps> = ({
	product_id: id,
	activeClass,
	className,
	onClick,
	...props
}) => {
	const { isLogged, isFavourite, toggleFavourite } = useFavourite(id);

	if (!isLogged) return null;

	return (
		<button
			className={clsx(
				c.wrapper,
				isFavourite && c['_is-active'],
				className,
			)}
			onClick={toggleFavourite}
			{...props}
		>
			<Icon name={isFavourite ? 'heart-filled' : 'heart'} />
		</button>
	);
};

export default FavouriteBtn;
