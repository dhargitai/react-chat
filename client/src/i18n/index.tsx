import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';
import 'moment/locale/pt-br';
import { setLocale as setYupLocale } from 'yup';
import hu from '~i18n/hu';
import en from '~i18n/en';
import dateFnsHu from 'date-fns/locale/hu';
import {STORAGE_KEY_SETTINGS} from '~services/settings/localStorageSettingsService';

let currentLanguageCode: any = null;

export type LanguageCode = 'en' | 'hu';

interface Language {
  id: LanguageCode;
  label: string;
  dictionary: any;
  dateFns: any;
}

const languages: { en: Language, hu: Language} = {
  en: {
    id: 'en',
    label: 'English',
    dictionary: en,
    dateFns: undefined,
  },
  hu: {
    id: 'hu',
    label: 'Hungarian',
    dictionary: hu,
    dateFns: dateFnsHu,
  },
};

function init() {
  const settingsValue = localStorage.getItem(STORAGE_KEY_SETTINGS);
  const settings = settingsValue ? JSON.parse(settingsValue) : null;
  currentLanguageCode = settings ? settings.language : 'en';
  setLanguageCode(currentLanguageCode);
}

export function getLanguage() {
  return languages[getLanguageCode()] as Language;
}

function format(message: string, args: any) {
  if (!message) {
    return '';
  }

  try {
    return message.replace(/{(\d+)}/g, function(
      match,
      number,
    ) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });
  } catch (error) {
    console.error(message, error);
    throw error;
  }
}

export function getLanguages() {
  return (Object.keys(languages) as Array<LanguageCode>).map((language: LanguageCode) => {
    return languages[language] as Language;
  });
}

export function getLanguageCode(): LanguageCode {
  if (!currentLanguageCode) {
    init();
  }

  return currentLanguageCode;
}

export function setLanguageCode(arg: LanguageCode) {
  if (!languages[arg]) {
    throw new Error(`Invalid language ${arg}.`);
  }

  moment.locale(arg);

  if (getLanguage().dictionary.validation) {
    setYupLocale(getLanguage().dictionary.validation);
  }
}

export function i18nExists(key: string) {
  const message = _get(getLanguage().dictionary, key);
  return !!message;
}

export function i18n(key: string, ...args: any) {
  const message = _get(getLanguage().dictionary, key);

  if (!message) {
    return key;
  }

  return format(message, args);
}

export function i18nHtml(key: string, ...args: any) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: i18n(key, ...args),
      }}
    />
  );
}
