import { FC, AllHTMLAttributes } from 'react';
import c from './Item.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { useActions } from '@/shared/store/hooks';
import { ISearchItem } from '@/entities/Search';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = ISearchItem & { isRecent: boolean } & Omit<
		AllHTMLAttributes<HTMLDivElement>,
		'id'
	>;
const Item: FC<IProps> = ({
	id,
	isRecent,
	name,
	slug,
	className,
	onClick,
	...props
}) => {
	const { addToSearchHistory, closeSearch, removeFromSearchHistory } =
		useActions();

	const handleClick = (id: number) => {
		addToSearchHistory(id);
		closeSearch();
	};
	const handleRemove = (e: any) => {
		e.stopPropagation();
		removeFromSearchHistory(id);
	};

	return (
		<div
			className={clsx(c.wrapper, isRecent && c['_is-recent'], className)}
			onClick={e => {
				handleClick(id);
				onClick && onClick(e);
			}}
			{...props}
		>
			<FullSizeLink href={`/product/${slug}`} />
			{isRecent && <Icon name={'history'} className={c.recentIcon} />}
			<div className={c.name}>{name}</div>
			{isRecent && (
				<button className={c.removeBtn} onClick={handleRemove}>
					<Icon name={'close'} className={c.removeBtnIcon} />
				</button>
			)}
		</div>
	);
};

export default Item;
