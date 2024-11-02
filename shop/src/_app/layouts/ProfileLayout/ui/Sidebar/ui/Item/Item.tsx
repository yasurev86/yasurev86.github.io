import { FC, AllHTMLAttributes } from 'react';
import c from './Item.module.scss';
import clsx from 'clsx';
import { TIconName } from '@/shared/ui/components/Icon';
import { Icon } from '@/shared/ui/components';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = {
	icon: TIconName;
	name: string;
	href?: string;
	isSelected?: boolean;
} & AllHTMLAttributes<HTMLDivElement>;
const Item: FC<IProps> = ({
	icon,
	name,
	href,
	isSelected = false,
	className,
	...props
}) => {
	return (
		<div
			className={clsx(
				c.wrapper,
				isSelected && c['_is-selected'],
				className,
			)}
			{...props}
		>
			{href && <FullSizeLink href={href} />}
			<Icon name={icon} className={c.icon} />
			<span className={c.name}>{name}</span>
		</div>
	);
};

export default Item;
