import { AllHTMLAttributes, FC } from 'react';
import c from './Availability.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { EAvailability } from '@/entities/Product';
import { i18n } from '@/shared/i18n';

type IProps = {
	availability: EAvailability;
} & AllHTMLAttributes<HTMLDivElement>;
const Availability: FC<IProps> = ({ availability, className, ...props }) => {
	return (
		<div
			className={clsx(
				c.wrapper,
				c[`variant--${EAvailability[availability]}`],
				className,
			)}
			{...props}
		>
			{availability == EAvailability.inStock && (
				<>
					<Icon name={'checkbox'} className={c.icon} />
					{i18n('in_stock')}
				</>
			)}
			{availability == EAvailability.outOfStock && (
				<>{i18n('out_of_stock')}</>
			)}
			{availability == EAvailability.discountinued && (
				<>{i18n('discontinued')}</>
			)}
		</div>
	);
};

export default Availability;
