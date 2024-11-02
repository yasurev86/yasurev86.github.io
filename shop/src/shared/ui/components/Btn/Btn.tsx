import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react';
import c from './Btn.module.scss';
import clsx from 'clsx';
import Icon, { TIconName } from '@/shared/ui/components/Icon';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = {
	use?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-accent';
	size?: 'large' | 'normal' | 'medium' | 'small';
	iconPos?: 'left' | 'right';
	icon?: TIconName;
	disabled?: boolean;
	state?: 'default' | 'hover' | 'active' | 'focus';
	link?: string;
	target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
	fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const Btn = forwardRef<HTMLButtonElement, IProps>(
	(
		{
			use = 'primary',
			size = 'normal',
			iconPos = 'left',
			icon,
			children,
			disabled,
			state,
			link,
			target,
			fullWidth,
			className,
			type = 'button',
			...props
		},
		ref,
	) => {
		const iconElement = icon && <Icon name={icon} />;

		const classNames = clsx([
			c.wrapper,
			c[`use--${use}`],
			c[`size--${size}`],
			c[`iconPos--${iconPos}`],
			c[`state--${state}`],
			!children && c['icon--only'],
			children && icon && c['icon--with'],
			children && !icon && c['icon--no'],
			fullWidth && c.fullWidth,
			className,
		]);

		return (
			<button
				className={classNames}
				disabled={disabled}
				ref={ref}
				tabIndex={link ? -1 : undefined}
				type={type}
				{...props}
			>
				{link && <FullSizeLink href={link} target={target} />}
				{icon && iconPos == 'left' && (
					<span className={c.icon}>{iconElement}</span>
				)}
				{children && <span className={c.inner}>{children}</span>}
				{icon && iconPos == 'right' && (
					<span className={c.icon}>{iconElement}</span>
				)}
			</button>
		);
	},
);

export default Btn;
