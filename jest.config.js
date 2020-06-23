module.exports = {
    roots: ['src'],
    setupFilesAfterEnv: ['./src/tests/jest.setup.js'],
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js', '!src/**/*.stories.js', '!src/index.js'],
    testPathIgnorePatterns: ['node_modules/'],
    testMatch: ['**/*.test.(js|jsx)'],
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
};
