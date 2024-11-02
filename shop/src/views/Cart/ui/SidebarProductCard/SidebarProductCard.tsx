import { FC, AllHTMLAttributes } from 'react';
import c from './SidebarProductCard.module.scss';
import clsx from 'clsx';
import { ActualPrice } from '@/shared/ui/components';

type IProps = {
	image: string;
	name: string;
	code: string;
	price: number;
} & AllHTMLAttributes<HTMLDivElement>;
const SidebarProductCard: FC<IProps> = ({
	image,
	name,
	code,
	price,
	className,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<img src={image} alt="" className={c.image} loading="lazy" />
			<div>
				<p className={c.name}>{name}</p>
				<p className={c.code}>{code}</p>
			</div>
			<ActualPrice price={price} className={c.price} />
		</div>
	);
};

export default SidebarProductCard;
