import { FC, ReactNode } from 'react';
import { Loader } from '@/shared/ui/components';

type IProps = {
	isLoading: boolean;
	data: any;
	fallback?: ReactNode;
	content: (data: any) => ReactNode;
	emptyResult: ReactNode;
	isEmpty?: boolean;
};
const ConditionalLoadingBlock: FC<IProps> = ({
	isLoading,
	data,
	fallback,
	content,
	emptyResult,
	isEmpty = false,
	...props
}) => {
	return (
		<>
			{isLoading
				? fallback || <Loader />
				: isEmpty || (Array.isArray(data) && !data.length) || !data
					? emptyResult
					: content(data)}
		</>
	);
};

export default ConditionalLoadingBlock;
