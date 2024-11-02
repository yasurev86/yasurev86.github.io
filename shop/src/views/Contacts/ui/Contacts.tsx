import { FC, AllHTMLAttributes } from 'react';
import c from './Contacts.module.scss';
import Stats from '@/features/Stats';
import { Breadcrumbs } from '@/shared/ui/components';
import Block from './Block/Block';
import Map from './Map/Map';
import { IShared } from '@/entities/Shared';
import { IContactsData } from '@/views/Contacts';
import { i18n } from '@/shared/i18n';

type IProps = {
	data: IContactsData & { info: IShared };
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'data'>;
const Contacts: FC<IProps> = ({
	data: { caption, subcaption, info },
	className,
	...props
}) => {
	return (
		<>
			<section className="_remain-top-margin">
				<Breadcrumbs items={[{ link: '', name: i18n('contacts') }]} />
				<div className={c.container}>
					<div className={c.left}>
						<h1 className={c.caption}>{caption}</h1>
						{subcaption && <p>{subcaption}</p>}
					</div>
					<div>
						<Block caption={i18n('support')}>{info.email}</Block>
						<Block caption={i18n('addresses')}>
							{info.address}
						</Block>
						<Block caption={i18n('schedule')}>
							{info.schedule}
						</Block>
						<Block caption={i18n('email')}>{info.email}</Block>
					</div>
				</div>
			</section>
			<Map />
			<Stats />
		</>
	);
};

export default Contacts;
