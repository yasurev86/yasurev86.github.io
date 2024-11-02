import { FC, AllHTMLAttributes } from 'react';
import c from './InfoLine.module.scss';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';

type IProps = {
	name: string;
	content: string;
	withBorder?: boolean;
	column?: boolean;
	isLoading?: boolean;
} & AllHTMLAttributes<HTMLDivElement>;
const InfoLine: FC<IProps> = ({
	name,
	content,
	withBorder = false,
	column = false,
	className,
	isLoading = false,
	...props
}) => {
	return (
		<div
			className={clsx(
				c.wrapper,
				withBorder && c['_withBorder'],
				column && c['_column'],
				className,
			)}
			{...props}
		>
			<span className={c.name}>{name}</span>
			<span className={c.content}>
				{isLoading ? <Skeleton width={'10em'} /> : content || '-'}
			</span>
		</div>
	);
};

export default InfoLine;
