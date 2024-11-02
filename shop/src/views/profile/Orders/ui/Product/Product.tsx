import { FC, AllHTMLAttributes } from 'react';
import c from './Product.module.scss';
import clsx from 'clsx';
import { ReviewBtn } from '@/shared/ui/components/Btns';
import { IOrderItem } from '@/entities/Order';
import { formatPrice, getImagePath } from '@/shared/utils';
import { useModal } from '@/shared/store/hooks';
import { writeReviewModalName } from '@/features/modals';
import { i18n } from '@/shared/i18n';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = IOrderItem & AllHTMLAttributes<HTMLDivElement>;
const Product: FC<IProps> = ({
	product_variant_id,
	name,
	code,
	sum,
	image,
	quantity,
	slug,
	hasReview,
	className,
	...props
}) => {
	const { open } = useModal(writeReviewModalName);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.info}>
				<FullSizeLink href={`/product/${slug}`} target={'_blank'} />
				<img src={getImagePath(image)} alt="" loading="lazy" />
				<div>
					<p className={c.name}>{name}</p>
					<p className={c.code}>{code}</p>
				</div>
			</div>
			<div className={c.quantity}>
				<span>{i18n('quantity')}</span> {i18n('n_pieces', quantity)}
			</div>
			<div className={c.price}>
				<span>{i18n('price')}</span>
				{formatPrice(sum)} {i18n('currency')}
			</div>
			{!hasReview && (
				<div className={c.reviewBtn}>
					<ReviewBtn
						onClick={() => open({ id: product_variant_id })}
					/>
				</div>
			)}
		</div>
	);
};

export default Product;
