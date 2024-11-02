'use client';

import { FC, AllHTMLAttributes } from 'react';
import c from './Result.module.scss';
import clsx from 'clsx';
import { formatDate, formatPrice } from '@/shared/utils';
import UserBlock from './UserBlock/UserBlock';
import Items from './Items/Items';
import { useGetUserDataQuery } from '@/entities/User';
import { useGetOrderQuery, IOrder } from '@/entities/Order';
import { Btn, Icon, ConditionalLoadingBlock } from '@/shared/ui/components';
import { getAvatar } from '@/entities/User';
import { i18n } from '@/shared/i18n';

type IProps = { id: number } & Omit<AllHTMLAttributes<HTMLDivElement>, 'id'>;
const Result: FC<IProps> = ({ id, className, ...props }) => {
	const { data, isLoading } = useGetOrderQuery({ id });
	const { data: userData, isLoading: isUserDataLoading } =
		useGetUserDataQuery(undefined);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<ConditionalLoadingBlock
				isLoading={isLoading}
				data={data}
				content={(data: IOrder) => {
					const sumDiscount = data.items.reduce(
						(acc, { discountSum }) => acc + discountSum,
						0,
					);
					return (
						<>
							<div className={c.successIcon}>
								<Icon name={'checkbox'} />
							</div>
							<h1>{i18n('thanks_for_buy')}</h1>
							<h2>
								{i18n(
									'receipt_sent_to_email',
									data.customer_email,
								)}
							</h2>
							<UserBlock
								image={getAvatar(userData?.avatar)}
								name={data.customer_name}
								description={data.customer_email}
								className={c.userBlock}
							/>
							<div className={c.block}>
								<span>{i18n('order')}</span>
								<p>
									{i18n(
										'order_from_date',
										data.id,
										formatDate(data.createdAt),
									)}
								</p>
							</div>
							<div className={c.block}>
								<span>{i18n('payment')}</span>
								<p>
									{data.payment == 'onReceive'
										? i18n('on_order_receive')
										: i18n('online')}
								</p>
							</div>
							<div className={c.block}>
								<span>{i18n('receiver')}</span>
								<p>{data.receiver_name}</p>
							</div>
							<div className={c.block}>
								<span>
									{data.delivery == 'pickup'
										? i18n('pickup_address')
										: i18n('delivery_address')}
								</span>
								<p>
									{data.delivery == 'pickup'
										? data.pickupAddress
										: data.deliveryAddress}
								</p>
							</div>
							<Items className={c.items} items={data.items} />
							<div className={c.line}>
								<span>
									{i18n(
										'n_products_for_sum',
										data.items.length,
									)}
								</span>
								<span>
									{formatPrice(data.sum)}
									{i18n('currency')}
								</span>
							</div>
							{sumDiscount !== 0 && (
								<div className={c.line}>
									<span>{i18n('discount')}</span>
									<span className={c.accent}>
										{formatPrice(sumDiscount)}{' '}
										{i18n('currency')}
									</span>
								</div>
							)}
							<hr />
							<div className={clsx(c.line, c.total)}>
								<span>{i18n('total')}</span>
								<span>
									{formatPrice(data.sum)} {i18n('currency')}
								</span>
							</div>
							<Btn
								size={'large'}
								fullWidth
								className={c.continueBtn}
								link={'/catalog'}
							>
								{i18n('continue_shopping')}
							</Btn>
						</>
					);
				}}
				emptyResult={<>{i18n('order_not_found')}</>}
			/>
		</div>
	);
};

export default Result;
