'use client';

import { FC, AllHTMLAttributes, useState, useEffect, useRef } from 'react';
import c from './RangeBlock.module.scss';
import clsx from 'clsx';
import { clamp, formatPrice } from '@/shared/utils';
import { RangeInput } from '@/shared/ui/components';

type IProps = {
	min: number;
	max: number;
	name: string;
	onChange?: (args?: any) => void;
	resetFlicker?: boolean;
} & AllHTMLAttributes<HTMLDivElement>;
const RangeBlock: FC<IProps> = ({
	resetFlicker,
	onChange,
	min,
	max,
	name,
	className,
	...props
}) => {
	const [minMaxValue, setMinMaxValue] = useState({ min: 0, max: 100 });

	const percent = (max - min) / 100;

	const minValueFieldName = `${name}[min]`;
	const maxValueFieldName = `${name}[max]`;

	useEffect(() => {
		setMinMaxValue({ min: 0, max: 100 });
		onChange && onChange(minMaxValue);
	}, [resetFlicker]);

	const minInputRef = useRef<HTMLInputElement>(null);
	const maxInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const minInput = minInputRef.current;
		const maxInput = maxInputRef.current;

		if (!minInput || !maxInput) return;

		minInput.addEventListener('change', handleChange);
		maxInput.addEventListener('change', handleChange);

		return () => {
			minInput.removeEventListener('change', handleChange);
			maxInput.removeEventListener('change', handleChange);
		};
	}, []);

	useEffect(() => {
		const minInput = minInputRef.current;
		const maxInput = maxInputRef.current;

		if (!minInput || !maxInput) return;

		minInput.value = (min + minMaxValue.min * percent).toFixed(2);
		maxInput.value = (min + minMaxValue.max * percent).toFixed(2);
	}, [minMaxValue]);

	const handleChange = (e: Event) => {
		const { name, value } = e.target as HTMLInputElement;
		const numberValue = value ? parseFloat(value) : 0;
		if (name === minValueFieldName) {
			setMinMaxValue(cur => ({
				...cur,
				min: Math.min(
					clamp((numberValue - min) / percent, 0, 100),
					cur.max,
				),
			}));
		} else if (name === maxValueFieldName) {
			setMinMaxValue(cur => ({
				...cur,
				max: Math.max(
					clamp((numberValue - min) / percent, 0, 100),
					cur.min,
				),
			}));
		}
		onChange && onChange(minMaxValue);
	};

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.container}>
				<input
					type={'number'}
					placeholder={formatPrice(min)}
					name={minValueFieldName}
					ref={minInputRef}
				/>
				<span className={c.divider}>-</span>
				<input
					type={'number'}
					placeholder={formatPrice(max)}
					name={maxValueFieldName}
					ref={maxInputRef}
				/>
			</div>
			<RangeInput
				className={c.rangeInput}
				min={min}
				max={max}
				name={name + '[percent]'}
				minValue={minMaxValue.min}
				maxValue={minMaxValue.max}
				setMinMaxValue={setMinMaxValue}
				onChange={onChange}
			/>
		</div>
	);
};

export default RangeBlock;
