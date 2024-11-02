import { FC, AllHTMLAttributes } from 'react';
import c from './ProfileLayout.module.scss';
import clsx from 'clsx';
import { AdvantagesSection } from '@/shared/ui/sections';
import Content from './Content/Content';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const ProfileLayout: FC<IProps> = ({ className, children, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.container}>
				<Content>{children}</Content>
			</div>
			<AdvantagesSection className={c.advantages} />
		</div>
	);
};

export default ProfileLayout;
