import { FC, AllHTMLAttributes } from 'react';
import c from './CantGetServerData.module.scss';
import clsx from 'clsx';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const CantGetServerData: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{i18n('cant_get_server_data')}
		</div>
	);
};

export default CantGetServerData;
