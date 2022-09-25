module.exports = {
  importOrder: [
    // 3rd party imports always at the top
    '^models/(.*)$',
    '^api/(.*)$',
    '^store/(.*)$',
    '^hooks/(.*)$',
    '^constants/(.*)$',
    '^pages/(.*)$',
    '^components/(.*)$',
    '^utilities/(.*)$',
    '^e2e-tests/(.*)$',
    '^error-logging/(.*)$',
    '^styles/(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tabWidth: 2,
  semi: true,
  useTabs: false,
  singleQuote: true,
  printWidth: 80,
};
