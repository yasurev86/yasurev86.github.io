import { FC, PropsWithChildren } from 'react';
import { MediaProvider } from '@/_app/providers/MediaProvider';
import { ReduxProvider } from '@/_app/providers/ReduxProvider';
import { AuthProvider } from '@/_app/providers/AuthProvider';

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<MediaProvider>
			<ReduxProvider>
				<AuthProvider>{children}</AuthProvider>
			</ReduxProvider>
		</MediaProvider>
	);
};

export default AppProvider;
