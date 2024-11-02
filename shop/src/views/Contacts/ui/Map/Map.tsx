import { FC, AllHTMLAttributes } from 'react';
import c from './Map.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const Map: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<img src="/assets/images/contacts/map.png" alt="" loading="lazy" />
			<div className={c.marker}>
				<Icon name={'location'} className={c.icon} />
				<div className={c.hint}>
					<span>{i18n('addresses')}</span>
					{/* Need translate */}
					<p>Москва, ул. Пушкина, д. Колотушкина</p>
				</div>
			</div>
		</div>
	);
};

export default Map;
