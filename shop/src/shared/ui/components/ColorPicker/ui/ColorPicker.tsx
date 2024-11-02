import { FC, AllHTMLAttributes } from 'react';
import c from './ColorPicker.module.scss';
import clsx from 'clsx';
import ColorOption from './ColorOption/ColorOption';
import { IColor } from '@/entities/Product';

type IProps = {
	colors: IColor[];
	name?: string;
	isFirstInitialChecked?: boolean;
	onChange?: (args?: any) => void;
	initialChecked?: number;
} & AllHTMLAttributes<HTMLDivElement>;
const ColorPicker: FC<IProps> = ({
	onChange,
	colors,
	className,
	name,
	isFirstInitialChecked = true,
	initialChecked,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{colors.map((colorData, ind) => (
				<ColorOption
					{...colorData}
					inputName={name}
					key={colorData.id}
					onChange={onChange}
					initialChecked={
						isFirstInitialChecked
							? ind == 0
							: colorData.id == initialChecked
					}
				/>
			))}
		</div>
	);
};

export default ColorPicker;
