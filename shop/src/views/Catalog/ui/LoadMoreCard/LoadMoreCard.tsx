import React, { FC, AllHTMLAttributes } from 'react';
import c from './LoadMoreCard.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { i18n } from '@/shared/i18n';

type IProps = { productsCount: number } & AllHTMLAttributes<HTMLDivElement>;
const LoadMoreCard: FC<IProps> = ({ productsCount, className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<Icon name={'double-arrow'} className={c.icon} />
			<p className={c.text}>
				{i18n('show_n_more_products', productsCount)}
			</p>
		</div>
	);
};

export default LoadMoreCard;
