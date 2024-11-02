import React, { AllHTMLAttributes, FC } from 'react';
import c from './DevelopedBy.module.scss';
import clsx from 'clsx';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const DevelopedBy: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{i18n('developed_by')}&nbsp;
			<a href="" className={c.link}>
				yasurev86
			</a>
		</div>
	);
};

export default DevelopedBy;
