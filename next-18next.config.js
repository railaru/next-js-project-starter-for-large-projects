const LOCALES = {
  en_GB: 'en-GB',
  lt_LT: 'lt-LT',
};

const TRANSLATION_NAMESPACES = {
  COMMON: 'common',
  HEAD: 'head',
};

module.exports = {
  i18n: {
    defaultLocale: LOCALES.en_GB,
    locales: [LOCALES.en_GB, LOCALES.lt_LT],
  },
  LOCALES,
  TRANSLATION_NAMESPACES,
};
