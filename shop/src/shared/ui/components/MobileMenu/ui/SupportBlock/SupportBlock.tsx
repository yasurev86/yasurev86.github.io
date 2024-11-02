import { FC, AllHTMLAttributes } from 'react';
import c from './SupportBlock.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const SupportBlock: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<a className={c.link} href={'tel:+79999999999'}></a>
			<span>{i18n('support')}</span>
			<p>
				<Icon name={'phone'} className={c.icon} /> +7 (999) 999-99-99
			</p>
		</div>
	);
};

export default SupportBlock;
