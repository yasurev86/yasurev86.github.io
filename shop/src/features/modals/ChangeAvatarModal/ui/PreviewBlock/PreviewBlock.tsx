import { FC, AllHTMLAttributes, RefObject } from 'react';
import c from './PreviewBlock.module.scss';
import clsx from 'clsx';

type IProps = {
	canvasRef: RefObject<HTMLCanvasElement>;
	name: string;
	description: string;
} & AllHTMLAttributes<HTMLDivElement>;
const PreviewBlock: FC<IProps> = ({
	canvasRef,
	name,
	description,
	className,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.iconOrImage}>
				<canvas ref={canvasRef} />
			</div>
			<div className={c.info}>
				<p className={c.name}>{name}</p>
				<p className={c.description}>{description}</p>
			</div>
		</div>
	);
};

export default PreviewBlock;
