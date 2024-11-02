import { FC, AllHTMLAttributes } from 'react';
import c from './Status.module.scss';
import clsx from 'clsx';
import { TStatus } from '@/entities/Order';
import { i18n } from '@/shared/i18n';

type IProps = {
	type: TStatus;
} & AllHTMLAttributes<HTMLDivElement>;
const Status: FC<IProps> = ({ type, className, ...props }) => {
	return (
		<span
			className={clsx(c.wrapper, c[`type--${type}`], className)}
			{...props}
		>
			{type == 'payment' && i18n('status_payment')}
			{type == 'paymentProblem' && i18n('status_paymentProblem')}
			{type == 'collect' && i18n('status_collect')}
			{type == 'delivery' && i18n('status_delivery')}
			{type == 'reception' && i18n('status_reception')}
			{type == 'completed' && i18n('status_completed')}
			{type == 'cancelled' && i18n('status_cancelled')}
		</span>
	);
};

export default Status;
