import React, { FC, AllHTMLAttributes } from 'react';
import c from './NavItem.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { INavItem } from './INavItem';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = Omit<INavItem, 'isLoggedOnly'> &
	AllHTMLAttributes<HTMLDivElement>;
const NavItem: FC<IProps> = ({
	count,
	icon,
	className,
	name,
	link,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{link && <FullSizeLink href={link} />}
			<div className={c.icon}>{icon && <Icon name={icon} />}</div>
			<span className={c.name}>{name}</span>
			{count && <span className={c.count}>{count}</span>}
		</div>
	);
};

export default NavItem;
