module.exports = {
    rootDir: './src',
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/**/*.{js,jsx}',
        '!<rootDir>/**/*.stories.js',
        '!<rootDir>/index.js',
    ],
    coverageDirectory: '../coverage',
    testPathIgnorePatterns: ['node_modules/'],
    testMatch: ['**/*.test.(js|jsx)'],
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
        '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
    },
};
