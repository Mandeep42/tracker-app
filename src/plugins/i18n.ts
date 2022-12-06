import { createI18n } from "vue-i18n";
import en from "./locales/en";
import fr from "./locales/fr";

export default createI18n({
  locale: "en", // set locale
  fallbackLocale: "en", // set fallback locale
  allowComposition: true,
  messages: {
    en: en, // set locale messages
    fr: fr,
  },
});
