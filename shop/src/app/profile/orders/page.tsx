import { FC } from 'react';
import Orders from '@/views/profile/Orders';

export const dynamic = 'force-dynamic'; // defaults to auto

type IProps = {};
const OrdersPage: FC<IProps> = ({ ...props }) => {
	return <Orders />;
};

export default OrdersPage;
