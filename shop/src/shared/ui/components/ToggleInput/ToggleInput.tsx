import { FC, InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import c from './ToggleInput.module.scss';
import clsx from 'clsx';

type IProps = Pick<
	InputHTMLAttributes<HTMLInputElement>,
	'defaultChecked' | 'onChange'
> &
	Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor' | 'onChange'>;
const ToggleInput: FC<IProps> = ({
	className,
	children,
	onChange,
	defaultChecked,
	...props
}) => {
	return (
		<label className={clsx(c.wrapper, className)} {...props}>
			<input
				type="checkbox"
				onChange={onChange}
				defaultChecked={defaultChecked}
			/>
			<span className={c.icon}>
				<span></span>
			</span>
			<span className={c.content}>{children}</span>
		</label>
	);
};

export default ToggleInput;
