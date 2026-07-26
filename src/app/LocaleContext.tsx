import { useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { copy, type Locale } from '../data/portfolio';
import { LocaleContext } from './locale';
const STORAGE_KEY = 'portfolio-language';

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'pt';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'pt' || saved === 'en' || saved === 'es' ? saved : 'pt';
}

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
  };

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : locale;
    document.title = copy[locale].pageTitle;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, text: copy[locale] }), [locale]);

  return <LocaleContext value={value}>{children}</LocaleContext>;
}
