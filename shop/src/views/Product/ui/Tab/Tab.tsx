import { FC, AllHTMLAttributes, ReactNode } from 'react';
import c from './Tab.module.scss';
import clsx from 'clsx';

type IProps = {
	caption: string;
	headerElem?: ReactNode;
	isActive: boolean;
} & AllHTMLAttributes<HTMLDivElement>;
const Tab: FC<IProps> = ({
	caption,
	isActive,
	headerElem,
	children,
	className,
	...props
}) => {
	if (!isActive) return;

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.header}>
				<h3 className={c.caption}>{caption}</h3>
				{headerElem}
			</div>
			{children}
		</div>
	);
};

export default Tab;
