'use client';

import { FC, AllHTMLAttributes, useContext } from 'react';
import c from './Item.module.scss';
import clsx from 'clsx';
import Row from '../Row/Row';
import Status from '../Status/Status';
import Product from '../Product/Product';

import { formatDate, formatPrice } from '@/shared/utils';
import { useToggle } from '@/shared/hooks';
import { ToggleBtn } from '@/shared/ui/components/Btns';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { Icon, InfoLine } from '@/shared/ui/components';
import { IOrder } from '@/entities/Order';
import { i18n } from '@/shared/i18n';

type IProps = IOrder & Omit<AllHTMLAttributes<HTMLDivElement>, 'id'>;
const Item: FC<IProps> = ({
	id,
	sum,
	createdAt,
	status,
	items,
	customer_name,
	receiver_name,
	delivery,
	deliveryAddress,
	pickupAddress,
	phone,
	email,
	className,
	...props
}) => {
	const { isActive, toggle } = useToggle();
	const {
		max: { w767: maw767 },
	} = useContext(MediaContext);
	return (
		<div
			className={clsx(c.wrapper, isActive && c['_is-opened'], className)}
			{...props}
		>
			{maw767 ? (
				<div className={c.mobileHeader} onClick={toggle}>
					<div>
						<div className={c.caption}>
							{i18n('order_from_date', id, formatDate(createdAt))}
						</div>
						<Status type={status} className={c.mobileStatus} />
						{!isActive && (
							<div className={c.headerSum}>
								<span>{i18n('order_sum')}</span>
								{formatPrice(sum)}
								{i18n('currency')}
							</div>
						)}
					</div>
					<button className={c.toggleBtn}>
						<Icon name={isActive ? 'arrow-up' : 'arrow-down'} />
					</button>
				</div>
			) : (
				<div className={c.header} onClick={toggle}>
					<Row className={'row'}>
						<div>#{id}</div>
						<div>
							<Status type={status} />
						</div>
						<div>{formatDate(createdAt)}</div>
						<div style={{ textAlign: 'right' }}>
							{formatPrice(sum)} {i18n('currency')}
						</div>
						<div style={{ textAlign: 'right' }}>
							<ToggleBtn isActive={isActive} />
						</div>
					</Row>
				</div>
			)}
			{isActive && (
				<div className={c.body}>
					<p className={c.sectionCaption}>
						{i18n('order_composition')}
					</p>
					{items.map(data => (
						<Product {...data} key={data.product_variant_id} />
					))}
					<p className={c.sectionCaption}>{i18n('order_info')}</p>
					<InfoLine
						name={i18n('order_placed_for')}
						content={customer_name}
						withBorder
					/>
					<InfoLine
						name={i18n('receiver')}
						content={receiver_name}
						withBorder
					/>
					<InfoLine name={i18n('phone')} content={phone} withBorder />
					<InfoLine name={'Email'} content={email} withBorder />
					<InfoLine
						name={
							delivery == 'pickup'
								? i18n('delivery_address')
								: i18n('pickup_address')
						}
						content={
							delivery == 'pickup'
								? pickupAddress
								: deliveryAddress
						}
						withBorder
					/>
					<div className={c.footer}>
						<div>
							<InfoLine
								name={i18n('order_comment')}
								content={'Lorem ipsum dolor'}
								column
							/>
						</div>
						<div>
							<InfoLine
								name={i18n('products_sum')}
								content={`${formatPrice(sum)} ${i18n('currency')}`}
							/>
							<InfoLine
								name={i18n('delivery')}
								content={i18n('free')}
							/>
							<InfoLine
								className={c.total}
								name={i18n('total')}
								content={`${formatPrice(sum)} ${i18n('currency')}`}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Item;
