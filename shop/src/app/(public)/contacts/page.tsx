import { FC } from 'react';
import { fetchApi } from '@/shared/api';
import Contacts, { IContactsData } from '@/views/Contacts';
import { IShared } from '@/entities/Shared';
import { CantGetServerData } from '@/shared/ui/components';

type IProps = {};
const ContactsPage: FC<IProps> = async ({ ...props }) => {
	const pageResponse = await fetchApi<IContactsData>('contacts-page');

	const sharedResponse = await fetchApi<IShared>('shared', {
		fields: ['email', 'schedule', 'address', 'phone'],
	});

	if (!pageResponse.data) return <CantGetServerData />;

	const data: IContactsData & { info: IShared } = ((
		{ attributes: { caption, subcaption } },
		{ attributes: info },
	) => {
		return { caption, subcaption, info };
	})(pageResponse.data, sharedResponse?.data);

	return (
		<>
			<Contacts data={data} />
		</>
	);
};

export default ContactsPage;
