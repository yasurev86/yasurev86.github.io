import { FC, AllHTMLAttributes } from 'react';
import c from './NotFound.module.scss';
import clsx from 'clsx';
import { Btn } from '@/shared/ui/components';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const NotFound: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<h1 className={c.caption}>{i18n('page_not_found')}</h1>
			<Btn link={'/'}>{i18n('back_to_main')}</Btn>
		</div>
	);
};

export default NotFound;
