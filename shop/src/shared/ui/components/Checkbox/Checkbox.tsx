import { FC, ReactNode, ChangeEvent } from 'react';
import c from './Checkbox.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';

type IProps = {
	children?: ReactNode;
	className?: string;
	name?: string;

	inputValue?: string;

	value?: boolean | ((arg?: any) => boolean);
	setValue?: (value: boolean) => void;

	disabled?: boolean;
};
const Checkbox: FC<IProps> = ({
	name,
	className,
	children,
	inputValue,

	value,
	setValue,

	disabled,
}) => {
	const isChecked = typeof value == 'function' ? value() : value;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (setValue) {
			setValue(e.target.checked);
		}
	};

	return (
		<label
			className={clsx(
				c.wrapper,
				disabled && c['_is-disabled'],
				className,
			)}
		>
			<input
				type="checkbox"
				name={`${name}[]`}
				value={inputValue}
				checked={isChecked}
				onChange={handleChange}
			/>
			<span className={c.iconContainer}>
				<Icon name={'checkbox'} className={c.icon} />
			</span>
			{children && <div className={c.inner}>{children}</div>}
		</label>
	);
};

export default Checkbox;
