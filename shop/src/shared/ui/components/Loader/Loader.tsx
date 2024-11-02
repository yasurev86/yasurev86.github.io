import { FC, AllHTMLAttributes } from 'react';
import c from './Loader.module.scss';
import clsx from 'clsx';
import { i18n } from '@/shared/i18n';
import IconLoader from '@/shared/assets/icons/loader.svg?icon';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const Loader: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<IconLoader className={c.loader} />
			{i18n('loading')}
		</div>
	);
};

export default Loader;
