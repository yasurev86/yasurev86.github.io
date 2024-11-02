type TLang = 'ru';

import { ruTranslate } from '@/shared/i18n/ru';

type TKey = keyof typeof ruTranslate;

const dict: { [lang in TLang]: { [key: string]: string } } = {
	ru: ruTranslate,
};

const currentLang = 'ru';

export const i18n = (
	key: TKey,
	...args: (string | number | undefined)[]
): string => {
	let translatedString = dict[currentLang][key];

	if (!!args.length) {
		args.forEach((arg, index) => {
			translatedString = translatedString.replace(
				`$${index}`,
				arg as string,
			);
		});
	}

	return translatedString;
};
