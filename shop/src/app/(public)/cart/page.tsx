import { FC } from 'react';
import Cart from '@/views/Cart';

type IProps = {};
const CartPage: FC<IProps> = ({ ...props }) => {
	return <Cart {...props} />;
};

export default CartPage;
