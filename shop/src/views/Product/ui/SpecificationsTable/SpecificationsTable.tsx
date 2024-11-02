import { FC, AllHTMLAttributes } from 'react';
import c from './SpecificationsTable.module.scss';
import clsx from 'clsx';

type IProps = {
	items: { id: number; name: string; value: string }[];
} & AllHTMLAttributes<HTMLDivElement>;
const SpecificationsTable: FC<IProps> = ({ items, className, ...props }) => {
	return (
		<>
			{items && (
				<div className={clsx(c.wrapper, className)} {...props}>
					{items.map(({ id, name, value }) => (
						<div className={c.element} key={id}>
							<span className={c.name}>{name}</span>
							<span className={c.value}>{value}</span>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default SpecificationsTable;
