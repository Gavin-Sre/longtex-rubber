export const locales = ["en", "th", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
	en: "English",
	th: "ไทย",
	zh: "中文",
};

export const localeShortNames: Record<Locale, string> = {
	en: "EN",
	th: "TH",
	zh: "CN",
};

/** Used in <html lang="..."> and <link rel="alternate" hreflang="..."> */
export const hreflangMap: Record<Locale, string> = {
	en: "en",
	th: "th",
	zh: "zh-CN",
};

/** Used in <meta property="og:locale" content="..."> */
export const ogLocaleMap: Record<Locale, string> = {
	en: "en_US",
	th: "th_TH",
	zh: "zh_CN",
};

export function isLocale(value: string): value is Locale {
	return (locales as readonly string[]).includes(value);
}
