import { FC, AllHTMLAttributes } from 'react';
import c from './Block.module.scss';
import clsx from 'clsx';

type IProps = {
	caption: string;
} & AllHTMLAttributes<HTMLDivElement>;
const Block: FC<IProps> = ({ caption, className, children, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<p className={c.caption}>{caption}</p>
			{children}
		</div>
	);
};

export default Block;
