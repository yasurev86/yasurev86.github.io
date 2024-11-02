import React, { FC } from 'react';
import Footer from './Footer';
import { getFooterData } from '../api/getFooterData';
type IProps = {};
const FooterServer: FC<IProps> = async ({ ...props }) => {
	const { blocks, contacts } = await getFooterData();

	return <Footer blocks={blocks} contacts={contacts} />;
};

export default FooterServer;
