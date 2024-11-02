export type TMediaContext = {
	[key in 'max' | 'min']: {
		[key in `w${number}` | `h${number}`]?: boolean | undefined;
	};
};
