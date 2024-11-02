import { FC } from 'react';
import c from './Block.module.scss';

type IProps = {
	name: string;
	text: string;
};
const Block: FC<IProps> = ({ name, text, ...props }) => {
	return (
		<div className={c.wrapper} {...props}>
			<p className={c.name}>{name}</p>
			<p className={c.text}>{text}</p>
		</div>
	);
};

export default Block;
