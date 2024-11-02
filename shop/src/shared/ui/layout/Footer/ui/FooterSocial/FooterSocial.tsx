import { AllHTMLAttributes, FC } from 'react';
import c from './FooterSocial.module.scss';
import { Icon } from '@/shared/ui/components';
import clsx from 'clsx';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const FooterSocial: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<a href="" className={c.item}>
				<Icon name={'facebook'} style={{ fontSize: 14 }} />
			</a>
			<a href="" className={c.item}>
				<Icon name={'youtube'} style={{ fontSize: 17 }} />
			</a>
			<a href="" className={c.item}>
				<Icon name={'instagram'} style={{ fontSize: 16 }} />
			</a>
		</div>
	);
};

export default FooterSocial;
