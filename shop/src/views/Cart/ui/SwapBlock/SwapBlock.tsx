'use client';

import { FC, AllHTMLAttributes, ReactNode, useEffect } from 'react';
import c from './SwapBlock.module.scss';
import clsx from 'clsx';
import Icon, { TIconName } from '@/shared/ui/components/Icon';
import { Btn } from '@/shared/ui/components';
import { useToggle } from '@/shared/hooks';
import { ExclusiveProperties } from '@/shared/types/utilityTypes';
import { i18n } from '@/shared/i18n';

type IProps = ExclusiveProperties<{ image: string; icon: TIconName }> & {
	name: string;
	description: string;
	className?: string;
	isDefaultOpened?: boolean;
} & ExclusiveProperties<{
		children: (close: () => void) => ReactNode;
		onClick: AllHTMLAttributes<HTMLButtonElement>['onClick'];
	}>;
const SwapBlock: FC<IProps> = ({
	image,
	icon,
	name,
	description,
	className,
	children,
	onClick,
	isDefaultOpened,
	...props
}) => {
	const { isActive, toggle, enable, disable } = useToggle(isDefaultOpened);

	useEffect(() => {
		(isDefaultOpened ? enable : disable)();
	}, [isDefaultOpened]);

	return (
		<div className={clsx(c.wrapper, className)}>
			{isActive ? (
				<div className={c.back}>{children && children(disable)}</div>
			) : (
				<div className={c.front}>
					<div className={c.iconOrImage}>
						{image && <img src={image} alt="" />}
						{icon && <Icon name={icon} />}
					</div>
					<div className={c.info}>
						<p className={c.name}>{name}</p>
						<p className={c.description}>{description}</p>
					</div>
					<Btn
						use={'tertiary'}
						size={'medium'}
						onClick={onClick ?? toggle}
					>
						{i18n('edit')}
					</Btn>
				</div>
			)}
		</div>
	);
};

export default SwapBlock;
