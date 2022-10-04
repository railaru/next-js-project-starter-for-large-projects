// jest.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const createJestConfig = nextJest({ dir: './' });

// Any custom config you want to pass to Jest
// const customJestConfig = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
// };

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig();
