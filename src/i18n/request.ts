import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const locales = ['en', 'fr'] as const;

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = cookieLocale && locales.includes(cookieLocale as any) ? cookieLocale : 'en';

  return {
    locale,
    messages: (await import(`../../translations/${locale}.json`)).default,
  };
});
