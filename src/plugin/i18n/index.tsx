import React from 'react';
import { IntlProvider } from 'utils/react-intl';
import { DEFAULT_LANGUAGE, LANGUAGE_PACKAGES_MAP } from 'locale';
import { AsyncStorage, Provider } from '@terminus/nusi-mobile';
import { Text } from 'react-native';
import getLocales from './localize';

const textComponent = Text;

export async function i18nPlugin(options: { theme: Record<string, any>; defaultLocale: string; language?: string }) {
  const { language, theme, defaultLocale } = options;
  const lang = language || (await getCurrentLocale());
  const localData = await getLangPackage(lang);

  return {
    component: LocaleCombineProvider,
    props: { ...localData, theme, defaultLocale: defaultLocale || DEFAULT_LANGUAGE },
    subscribes: {
      changeLanguage: (payload) => payload,
    },
  };
}

export function LocaleCombineProvider(props) {
  const { locale, messages, defaultLocale, theme, nusi, currency } = props;

  return (
    <Provider theme={theme} locale={nusi}>
      <IntlProvider
        formats={{ number: { formatPrice: { currency, style: 'currency' } } }}
        textComponent={textComponent}
        locale={locale}
        messages={messages}
        defaultLocale={defaultLocale}
      >
        {props.children}
      </IntlProvider>
    </Provider>
  );
}

// 获取当前语言
export async function getCurrentLocale(language?: string) {
  if (isUsefulLocale(language)) {
    return language;
  }
  const stored = await AsyncStorage.get('language');

  if (isUsefulLocale(stored)) {
    return stored;
  }

  const locales = getLocales();
  if (isUsefulLocale(locales?.[0]?.languageTag)) {
    return locales[0].languageTag;
  }

  return DEFAULT_LANGUAGE;
}

// 语言是否可用
function isUsefulLocale(lang: string) {
  const isUseful = lang && Object.keys(LANGUAGE_PACKAGES_MAP).includes(lang);
  return isUseful;
}

// 获取语言包
export async function getLangPackage(lang: string) {
  const langModule = await LANGUAGE_PACKAGES_MAP[lang]();
  return langModule.default;
}

// 存储当前的语言设置
export async function saveLocale(language?: string) {
  if (language) {
    await AsyncStorage.set('language', language);
  } else {
    await AsyncStorage.remove('language');
  }
}
