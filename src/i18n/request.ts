import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export const locales = ['en', 'fr', 'es', 'de', 'ja', 'pt', 'zh', 'ar'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = cookieLocale && locales.includes(cookieLocale as Locale) ? cookieLocale : 'en';

  return {
    locale,
    messages: (await import(`../../translations/${locale}.json`)).default,
    timeZone: 'UTC',
    now: new Date(),
  };
});
