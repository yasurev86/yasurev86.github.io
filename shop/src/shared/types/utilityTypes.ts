export type ExclusiveProperties<T> = {
	[K in keyof T]-?: { [P in Exclude<keyof T, K>]?: never } & {
		[P in K]: T[P];
	};
}[keyof T];

export type MakeFieldsRequired<T, K extends keyof T> = T & {
	[P in K]-?: T[P];
};

export type Nullable<T> = T | null;
