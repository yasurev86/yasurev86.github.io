import { FC, AllHTMLAttributes } from 'react';
import clsx from 'clsx';
import { ActualPrice, Btn } from '@/shared/ui/components';
import c from './Actions.module.scss';
import { useModal } from '@/shared/store/hooks';
import { cartModalName } from '@/features/modals';
import { ICartItem } from '@/entities/Cart';
import { i18n } from '@/shared/i18n';

type IProps = {
	counts: { [key: number]: number };
	products: ICartItem[];
} & AllHTMLAttributes<HTMLDivElement>;
const Actions: FC<IProps> = ({ counts, products, className, ...props }) => {
	const { close } = useModal(cartModalName);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<Btn use={'secondary'} className={c.cancelBtn} onClick={close}>
				{i18n('continue_shopping')}
			</Btn>
			<div className={c.buy}>
				<div style={{ overflow: 'hidden' }}>
					<span className={c.totalPriceCaption}>{i18n('total')}</span>
					<ActualPrice
						className={c.totalPrice}
						price={products.reduce(
							(acc, { price, id }) => acc + price * counts[id],
							0,
						)}
					/>
				</div>
				<Btn className={c.cartBtn} link={'/cart'} onClick={close}>
					{i18n('perform_order')}
				</Btn>
			</div>
		</div>
	);
};

export default Actions;
