import { FC, AllHTMLAttributes } from 'react';
import c from './Stats.module.scss';
import clsx from 'clsx';
import Block from './Block/Block';
import { getStats } from '../api/getStats';

type IProps = AllHTMLAttributes<HTMLDivElement>;

const Stats: FC<IProps> = async ({ className, ...props }) => {
	const data = await getStats();

	if (!data) return <></>;

	return (
		<section className={clsx(c.wrapper, className)} {...props}>
			{data.map(el => (
				<Block {...el} key={el.name} />
			))}
		</section>
	);
};

export default Stats;
