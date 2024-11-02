import React, { FC } from 'react';
import Header from './Header';
import { fetchApi } from '@/shared/api';
import { IShared } from '@/entities/Shared';

type IProps = {};
const HeaderServer: FC<IProps> = async () => {
	const sharedResponse = await fetchApi<IShared>('shared', {
		fields: ['phone'],
	});

	const phone = sharedResponse.data?.attributes.phone;

	return <Header phone={phone} />;
};

export default HeaderServer;
