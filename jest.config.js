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
    moduleNameMapper: {
        // Mocks out all these file formats when tests are run
        '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            'identity-obj-proxy',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
};
