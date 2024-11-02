import { FC, AllHTMLAttributes } from 'react';
import c from './Block.module.scss';
import clsx from 'clsx';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = {
	caption: string;
	image: string;
	link: string;
} & AllHTMLAttributes<HTMLDivElement>;
const Block: FC<IProps> = ({ image, caption, link, className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<FullSizeLink href={link} className="full-size-link" />
			<img src={image} className={c.image} alt="" loading="lazy" />
			<p className={c.caption}>{caption}</p>
		</div>
	);
};

export default Block;
