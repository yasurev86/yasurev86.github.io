import React, { FC, ComponentProps } from 'react';
import { Btn } from '@/shared/ui/components';
import { useCart } from '@/shared/store/hooks';

type IProps = ComponentProps<typeof Btn> & {
	isLoading?: boolean;
	product_id: number;
};
const CartBtn: FC<IProps> = ({
	size = 'medium',
	isLoading,
	product_id: id,
	...props
}) => {
	const { isInCart, toggleCartItem } = useCart(id);

	return (
		<Btn
			icon={isInCart ? 'bag-checked' : 'bag'}
			size={size}
			onClick={toggleCartItem}
			{...props}
		/>
	);
};

export default CartBtn;
