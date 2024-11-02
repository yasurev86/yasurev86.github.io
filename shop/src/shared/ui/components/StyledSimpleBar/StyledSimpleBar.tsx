import { FC, ComponentProps } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const StyledSimpleBar: FC<ComponentProps<typeof SimpleBar>> = props => {
	return <SimpleBar {...props} />;
};

export default StyledSimpleBar;
