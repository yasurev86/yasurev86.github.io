import { FC } from 'react';
import c from './ColorOption.module.scss';
import clsx from 'clsx';
import { IColor } from '@/entities/Product';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = IColor & {
	className?: string;
	inputName?: string;
	initialChecked?: boolean;
	onChange?: (args?: any) => void;
};
const ColorOption: FC<IProps> = ({
	onChange,
	id,
	name,
	value,
	inputName,
	initialChecked,
	slug,
	className,
}) => {
	if (!inputName) {
		return (
			<div
				className={clsx(
					c.wrapper,
					c['variant--default'],
					initialChecked && c['_checked'],
					className,
				)}
				style={{ color: value }}
				title={name}
			>
				<FullSizeLink href={`/product/${slug}`} />
				<span className={c.icon}>
					<span></span>
				</span>
			</div>
		);
	}

	return (
		<label
			className={clsx(c.wrapper, c['variant--input'], className)}
			style={{ color: value }}
			title={name}
		>
			<input
				type="radio"
				name={`${inputName}`}
				value={id}
				defaultChecked={initialChecked}
				onChange={e => {
					onChange && onChange(e.target.checked);
				}}
			/>
			<span className={c.icon}>
				<span></span>
			</span>
		</label>
	);
};

export default ColorOption;
