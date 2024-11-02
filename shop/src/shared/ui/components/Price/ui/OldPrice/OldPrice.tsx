import { FC, AllHTMLAttributes } from 'react';
import c from './OldPrice.module.scss';
import clsx from 'clsx';
import { formatPrice } from '@/shared/utils';
import { i18n } from '@/shared/i18n';

type IProps = { price: number } & AllHTMLAttributes<HTMLDivElement>;
const OldPrice: FC<IProps> = ({ price, className, ...props }) => {
	return (
		<span className={clsx(c.wrapper, className)} {...props}>
			{formatPrice(price)} {i18n('currency')}
		</span>
	);
};

export default OldPrice;
