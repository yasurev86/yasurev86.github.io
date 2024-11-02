import { AllHTMLAttributes, FC } from 'react';
import c from './FooterBlockItem.module.scss';
import clsx from 'clsx';

type IProps = {
	caption: string;
} & AllHTMLAttributes<HTMLDivElement>;
const FooterBlockItem: FC<IProps> = ({
	caption,
	children,
	className,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<p className={c.caption}>{caption}</p>
			{children}
		</div>
	);
};

export default FooterBlockItem;
