import { createI18n } from 'vue-i18n';
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import PsConfig from '@/config/PsConfig';

function loadLocaleMessages () {
  const locales = require.context('@/assets/locales/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

const psValueHolder = PsValueProvider.psValueHolder;
const languageCode = psValueHolder.languageCode;

export const i18n = createI18n({
  locale:  languageCode || 'en',
  fallbackLocale: languageCode || 'en',
  messages: loadLocaleMessages()
})



