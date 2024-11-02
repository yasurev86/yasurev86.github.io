'use client';

import { FC, AllHTMLAttributes } from 'react';
import c from './Orders.module.scss';
import clsx from 'clsx';
import Row from './Row/Row';
import Item from './Item/Item';
import { useGetOrdersQuery } from '@/entities/Order/api/orderApi';
import { ConditionalLoadingBlock } from '@/shared/ui/components';
import { IOrder } from '@/entities/Order';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const Orders: FC<IProps> = ({ className, ...props }) => {
	const { data: orders, isLoading } = useGetOrdersQuery(undefined);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<Row className={c.header}>
				<span>{i18n('order_number')}</span>
				<span>{i18n('status')}</span>
				<span>{i18n('date')}</span>
				<span style={{ textAlign: 'right' }}>{i18n('sum')}</span>
			</Row>
			<ConditionalLoadingBlock
				isLoading={isLoading}
				data={orders}
				content={(orders: IOrder[]) =>
					orders.map(data => <Item {...data} />)
				}
				emptyResult={
					<div style={{ padding: 10 }}>
						{i18n('orders_not_found')}
					</div>
				}
			/>
		</div>
	);
};

export default Orders;
