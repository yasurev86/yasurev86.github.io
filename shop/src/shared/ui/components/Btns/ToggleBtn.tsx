import { FC, ComponentProps } from 'react';
import { Btn } from '@/shared/ui/components';
import { i18n } from '@/shared/i18n';

type IProps = Omit<
	ComponentProps<typeof Btn>,
	'icon' | 'size' | 'use' | 'onClick' | 'iconPos'
> & { isActive: boolean; toggle?: () => void };
const ReviewBtn: FC<IProps> = ({ isActive, toggle, className, ...props }) => {
	return (
		<Btn
			use={'tertiary-accent'}
			onClick={toggle}
			icon={isActive ? 'arrow-up' : 'arrow-down'}
			iconPos={'right'}
			size={'medium'}
		>
			{isActive ? i18n('wrap') : i18n('unwrap')}
		</Btn>
	);
};

export default ReviewBtn;
