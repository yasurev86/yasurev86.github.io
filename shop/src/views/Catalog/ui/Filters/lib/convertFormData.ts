type TTransformedData = {
	[key: string]: string[] | { [key: string]: string } | string;
};

export const convertFormData = (formData: FormData): TTransformedData => {
	const transformedData: TTransformedData = {};

	// @ts-ignore
	for (const pair of formData.entries()) {
		const [key, value] = pair as [string, string];

		if (key.includes('[]')) {
			const paramName = key.replace('[]', '');
			if (!transformedData[paramName]) {
				transformedData[paramName] = [];
			}
			(transformedData[paramName] as string[]).push(value);
		} else if (key.includes('[')) {
			const [paramName, subKey] = key.split('[');
			const cleanSubKey = subKey.replace(']', '');
			if (!transformedData[paramName]) {
				transformedData[paramName] = {};
			}
			if (cleanSubKey == 'min' || cleanSubKey == 'max') {
				// @ts-ignore
				transformedData[paramName][cleanSubKey] = value.replace(
					',',
					'.',
				);
			} else {
				// @ts-ignore
				transformedData[paramName][cleanSubKey] = value;
			}
		} else {
			// @ts-ignore
			transformedData[key] = value === '0' ? false : value;
		}
	}

	return transformedData;
};
