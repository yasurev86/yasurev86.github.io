import { FC } from 'react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

type IProps = IntersectionOptions & { className?: string };
const InViewTrigger: FC<IProps> = ({ className, ...props }) => {
	const { ref } = useInView({
		threshold: 0,
		...props,
	});

	return <div className={className} ref={ref} />;
};

export default InViewTrigger;
