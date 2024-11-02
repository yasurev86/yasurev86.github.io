declare module '*.svg?url' {
	const content: string
	export default content
}

declare module '*.svg?icon' {
	const content: ReactNode
	export default content
}

declare module '*.svg' {
	const content: ReactNode
	export default content
}