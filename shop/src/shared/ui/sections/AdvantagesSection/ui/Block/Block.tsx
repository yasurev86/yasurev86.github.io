import { AllHTMLAttributes, FC } from 'react';
import c from './Block.module.scss';
import Icon, { TIconName } from '@/shared/ui/components/Icon';
import clsx from 'clsx';

type IProps = {
	icon: TIconName;
	caption: string;
	text: string;
} & AllHTMLAttributes<HTMLDivElement>;
const AdvantagesSection: FC<IProps> = ({ icon, caption, text, className }) => {
	return (
		<div className={clsx(c.wrapper, className)}>
			<Icon name={icon} className={c.icon} />
			<div>
				<p className={c.caption}>{caption}</p>
				<p className={c.text}>{text}</p>
			</div>
		</div>
	);
};

export default AdvantagesSection;
