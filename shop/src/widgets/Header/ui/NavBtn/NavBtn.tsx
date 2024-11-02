import React, { ButtonHTMLAttributes, FC } from 'react';
import c from './NavBtn.module.scss';
import Icon, { TIconName } from '@/shared/ui/components/Icon';
import clsx from 'clsx';
import { useModal } from '@/shared/store/hooks';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = {
	count?: number;
	icon: TIconName;
	link?: string;
	modal?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BaseNavBtn: FC<IProps> = ({
	modal,
	link,
	count,
	icon,
	className,
	children,
	...props
}) => {
	return (
		<button
			className={clsx(c.wrapper, className)}
			tabIndex={link ? -1 : undefined}
			{...props}
		>
			{link && <FullSizeLink href={link} />}
			{icon && <Icon name={icon} />}
			{!!count && <span className={c.count}>{count}</span>}
		</button>
	);
};

const NavBtnWithModal: FC<IProps> = ({ modal, onClick, ...props }) => {
	if (!modal) return;
	const { open } = useModal(modal);
	return (
		<BaseNavBtn
			{...props}
			onClick={e => {
				open();
				onClick && onClick(e);
			}}
		/>
	);
};

const NavBtn: FC<IProps> = ({ ...props }) => {
	if (props.modal) return <NavBtnWithModal {...props} />;
	return <BaseNavBtn {...props} />;
};

export default NavBtn;
