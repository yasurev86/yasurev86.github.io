import { FC, AllHTMLAttributes } from 'react';
import c from './Discount.module.scss';
import clsx from 'clsx';
import { IDiscount } from '@/entities/Product';
import { i18n } from '@/shared/i18n';

type IProps = { data: IDiscount } & Omit<
	AllHTMLAttributes<HTMLDivElement>,
	'data'
>;
const Discount: FC<IProps> = ({ data, className, ...props }) => {
	return (
		<span className={clsx(c.wrapper, className)} {...props}>
			-{data.value}
			{data.type == 'percent' ? '%' : i18n('currency')}
		</span>
	);
};

export default Discount;
