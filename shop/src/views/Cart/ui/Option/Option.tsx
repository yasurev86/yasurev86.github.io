import { FC, AllHTMLAttributes } from 'react';
import c from './Option.module.scss';
import clsx from 'clsx';
import { formatPrice } from '@/shared/utils';
import { i18n } from '@/shared/i18n';

type IProps = {
	name: string;
	description?: string;
	price?: number;
	isActive: boolean;
	onSelect: () => void;
} & AllHTMLAttributes<HTMLDivElement>;
const Option: FC<IProps> = ({
	name,
	description,
	price,
	className,
	children,
	isActive,
	onSelect,
	onClick,
	onKeyDown,
	...props
}) => {
	return (
		<div
			className={clsx(c.wrapper, isActive && c['_is-active'], className)}
			tabIndex={0}
			role={'button'}
			onKeyDown={e => {
				onKeyDown && onKeyDown(e);
				if (e.key === 'Enter') {
					onSelect();
				}
			}}
			onClick={e => {
				onClick && onClick(e);
				onSelect();
			}}
			{...props}
		>
			<div className={c.header}>
				<div className={c.checkbox}></div>
				<div className={c.text}>
					<p className={c.name}>{name}</p>
					<p className={c.description}>{description}</p>
				</div>
				{price !== undefined && (
					<div className={clsx(c.price)}>
						{price === 0 ? (
							<span className={c.free}>{i18n('free')}</span>
						) : (
							<>
								{formatPrice(price)} {i18n('currency')}
							</>
						)}
					</div>
				)}
			</div>
			{isActive && children && <div className={c.body}>{children}</div>}
		</div>
	);
};

export default Option;
