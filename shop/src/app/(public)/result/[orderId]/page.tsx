import { FC } from 'react';
import { Result } from '@/views/Result';

type IProps = { params: { orderId: number } };
const ResultPage: FC<IProps> = ({ params: { orderId }, ...props }) => {
	return <Result id={orderId} />;
};

export default ResultPage;
