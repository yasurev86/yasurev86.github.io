import Loading from '@/views/Loading/Loading';
import { ReactNode } from 'react';

export default function LoadingPage({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return <Loading />;
}
