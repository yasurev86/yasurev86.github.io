import React, { FC, AllHTMLAttributes } from 'react';
import c from './ActualPrice.module.scss';
import clsx from 'clsx';
import { formatPrice } from '@/shared/utils';
import { i18n } from '@/shared/i18n';

type IProps = { price: number } & AllHTMLAttributes<HTMLDivElement>;
const ActualPrice: FC<IProps> = ({ price, className, ...props }) => {
	return (
		<div
			className={clsx(c.wrapper, className)}
			{...props}
			title={price + i18n('currency')}
		>
			{formatPrice(price)}
			<span> {i18n('currency')}</span>
		</div>
	);
};

export default ActualPrice;
