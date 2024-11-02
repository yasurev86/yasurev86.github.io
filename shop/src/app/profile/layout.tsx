import ProfileLayout from '@/_app/layouts/ProfileLayout';
import { ReactNode } from 'react';

export default async function Layout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return <ProfileLayout>{children}</ProfileLayout>;
}
