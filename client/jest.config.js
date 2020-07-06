// ./client/jest.config.js
module.exports = {
    displayName: 'client',
    testEnvironmentOptions: {
        url: 'https://til.test.com',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    setupFilesAfterEnv: [
        './test/setup-test-framework.js',
    ],
    modulePaths: ['<rootDir>/src', '<rootDir>/test'],
    moduleNameMapper: {
        "~(.*)$": "<rootDir>/src/$1",
    },
};
