import React, { FC } from 'react';
import c from './PaymentMethods.module.scss';
import MirLogo from '@/shared/assets/images/logos/mir.svg';
import { i18n } from '@/shared/i18n';

type IProps = {};
const PaymentMethods: FC<IProps> = ({ ...props }) => {
	return (
		<div className={c.wrapper}>
			<span className={c.text}>{i18n('payment_we_accept')}</span>
			<MirLogo style={{ width: 60, height: 18 }} />
		</div>
	);
};

export default PaymentMethods;
