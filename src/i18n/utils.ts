import en from "./ui/en";
import th from "./ui/th";
import zh from "./ui/zh";
import type { UIDict } from "./ui/en";
import { defaultLocale, isLocale, locales, type Locale } from "./locales";

const dicts: Record<Locale, UIDict> = { en, th, zh };

/** Returns the entire UI dictionary for the given locale. Use as `t.section.key`. */
export function useTranslations(lang: Locale): UIDict {
	return dicts[lang] ?? dicts[defaultLocale];
}

/** Site base path (e.g. "/" locally, "/longtex-rubber/" on GH Pages), always trailing-slashed. */
const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

/** Strip the site base from a pathname so we work with site-relative paths. */
function stripBase(pathname: string): string {
	const baseNoTrail = baseUrl.replace(/\/$/, "");
	if (baseNoTrail && pathname.startsWith(baseNoTrail)) {
		return pathname.slice(baseNoTrail.length) || "/";
	}
	return pathname;
}

/** Read the active locale from the current URL. Falls back to the default locale. */
export function getLangFromUrl(url: URL): Locale {
	const path = stripBase(url.pathname);
	const segment = path.split("/").filter(Boolean)[0];
	if (segment && isLocale(segment)) return segment;
	return defaultLocale;
}

/** Strip the leading /<lang>/ segment from a site-relative path. */
function stripLocaleSegment(path: string): string {
	const match = path.match(/^\/(en|th|zh)(\/.*)?\/?$/);
	if (match) return match[2] || "/";
	return path || "/";
}

/**
 * Build a URL for the given locale that points at the same logical page as `currentUrl`.
 * Used by the language switcher: /en/products/  →  /th/products/.
 */
export function getLocalizedPath(target: Locale, currentUrl: URL): string {
	const sitePath = stripBase(currentUrl.pathname);
	const withoutLocale = stripLocaleSegment(sitePath);
	const trimmed = withoutLocale.replace(/^\/+/, "").replace(/\/+$/, "");
	const suffix = trimmed ? `${trimmed}/` : "";
	return `${baseUrl}${target}/${suffix}`;
}

/** Localized path for a known site-relative path under a given locale (e.g. "products/" → "/<base>/<lang>/products/"). */
export function localizePath(target: Locale, sitePath: string): string {
	const trimmed = sitePath.replace(/^\/+/, "").replace(/\/+$/, "");
	const suffix = trimmed ? `${trimmed}/` : "";
	return `${baseUrl}${target}/${suffix}`;
}
