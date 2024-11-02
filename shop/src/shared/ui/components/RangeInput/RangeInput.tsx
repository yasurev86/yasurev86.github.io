import React, {
	FC,
	AllHTMLAttributes,
	ChangeEvent,
	SetStateAction,
	Dispatch,
} from 'react';
import c from './RangeInput.module.scss';
import clsx from 'clsx';

type IProps = {
	min: number;
	max: number;
	minValue: number;
	maxValue: number;
	setMinMaxValue: Dispatch<SetStateAction<{ min: number; max: number }>>;
	name: string;
	onChange?: (args?: any) => void;
} & AllHTMLAttributes<HTMLDivElement>;
const RangeInput: FC<IProps> = ({
	name,
	min,
	max,
	minValue,
	maxValue,
	setMinMaxValue,
	className,
	onChange,
}) => {
	const minValueFieldName = `${name}[min]`;
	const maxValueFieldName = `${name}[max]`;

	// TODO: прикрутить debounce

	const handleChange = (event: ChangeEvent) => {
		const { name, value } = event.target as HTMLInputElement;
		const numberValue = parseInt(value);
		if (name === minValueFieldName) {
			setMinMaxValue(cur => ({
				...cur,
				min: Math.min(numberValue, maxValue),
			}));
		} else if (name === maxValueFieldName) {
			setMinMaxValue(cur => ({
				...cur,
				max: Math.max(minValue, numberValue),
			}));
		}
		onChange && onChange();
	};

	return (
		<div className={clsx(c.wrapper, className)}>
			<input
				type="range"
				min="0"
				max="100"
				value={minValue}
				name={minValueFieldName}
				onChange={handleChange}
				form={'ignoreForm'}
			/>
			<input
				type="range"
				min="0"
				max="100"
				value={maxValue}
				name={maxValueFieldName}
				onChange={handleChange}
				form={'ignoreForm'}
			/>
			<div
				className={c.fill}
				style={
					{
						'--min': `${minValue}%`,
						'--max': `${maxValue}%`,
					} as React.CSSProperties
				}
			></div>
		</div>
	);
};

export default RangeInput;
