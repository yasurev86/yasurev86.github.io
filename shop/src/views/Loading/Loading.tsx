import { FC, AllHTMLAttributes } from 'react';
import c from './Loading.module.scss';
import clsx from 'clsx';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const Loading: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{i18n('loading')}
		</div>
	);
};

export default Loading;
