import { FC, AllHTMLAttributes } from 'react';
import c from './ChooseRating.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { i18n } from '@/shared/i18n';

type IProps = {
	rating: number | undefined;
	onChange: (rating: number) => void;
	hasError?: boolean;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'onChange'>;
const ChooseRating: FC<IProps> = ({
	hasError,
	rating,
	onChange,
	className,
	...props
}) => {
	return (
		<div
			className={clsx(c.wrapper, hasError && c._hasError, className)}
			{...props}
		>
			{[
				i18n('rating_1'),
				i18n('rating_2'),
				i18n('rating_3'),
				i18n('rating_4'),
				i18n('rating_5'),
			].map((name, ind) => (
				<div
					className={c.block}
					onClick={() => onChange && onChange(ind + 1)}
					key={ind}
				>
					<Icon
						name={'star'}
						className={clsx(
							c.star,
							rating && rating > ind && c['star--active'],
						)}
					/>
					<span>{name}</span>
				</div>
			))}
		</div>
	);
};

export default ChooseRating;
