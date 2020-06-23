# Quick Overview on creating your own library

## Initial Set up

1. Install Yarn
2. Install Nodejs
3. Create directory `react-gadgets`
4. Inside react-gadgets folder, run `npm init -y` in the command line

## Configuring Rollup

1. Install React Packages
    - `yarn add --dev react react-dom @types/react prop-types`
    - Go to `package.json` and add `react` & `react-dom` as `Peer Dependencies`
        ```$xslt
        ...
        "peerDependencies": {
            "react": ">=16.8.0",
            "react-dom": ">=16.8.0"
        }
        ...
        ```
2. Install Babel related packages
    - `yarn add --dev @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread @babel/plugin-syntax-dynamic-import @babel/plugin-transform-arrow-functions @babel/plugin-transform-template-literals @babel/preset-env @babel/preset-react babel-plugin-transform-react-remove-prop-types`
3. Install Rollup related packages
    - `yarn add --dev rollup @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-node-resolve rollup-plugin-peer-deps-external`
4. Create a React Component inside `src` folder (eg. `src/components/Sample/Sample.jsx`)
5. Create the entry point `src/index.js`. Inside the `index.js`:
    ```$xslt
   export { default as Sample } from './components/Sample/Sample';
   ```
6. Inside `package.json`, add the build script and other parameter.
    ```$xslt
   ...
   "main": "dist/index.js",
   "source": "src/index.js",
   "files": [
       "dist"
   ],
   "scripts": {
        "build": "rollup -c"
   }
   ...
    ```
7. Set up `babel.config.js`
   ```$xslt
   module.exports = {
       presets: ['@babel/preset-env', '@babel/preset-react'],
       plugins: [
           '@babel/plugin-proposal-object-rest-spread',
           '@babel/plugin-syntax-dynamic-import',
           '@babel/plugin-proposal-class-properties',
           '@babel/plugin-transform-arrow-functions',
           '@babel/plugin-transform-template-literals',
           'babel-plugin-transform-react-remove-prop-types',
       ],
   };
   ```
8. Set up `rollup.config.js`
    ```$xslt
    import peerDepsExternal from 'rollup-plugin-peer-deps-external';
    import resolve from '@rollup/plugin-node-resolve';
    import babel from '@rollup/plugin-babel';
    import commonjs from '@rollup/plugin-commonjs';
    import packageJson from './package.json';
    
    export default {
        input: packageJson.source,
        output: {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: false,
        },
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            babel({
                exclude: 'node_modules/**',
                babelHelpers: 'bundled',
            }),
        ],
    };
    ```
9. Test if project can build
    - `yarn run build`

## Configuring Storybook

1. Add Storybook
    - `npx -p @storybook/cli sb init`
2. Add Storybook-addons
    - `yarn add --dev @storybook/addon-docs @storybook/addon-storysource`
3. Update `./storybook/main.js`
    ```$xslt
   module.exports = {
       stories: ['../src/**/*.stories.(js|mdx)'],
       addons: [
           '@storybook/addon-links',
           '@storybook/addon-docs',
           '@storybook/addon-storysource',
           '@storybook/addon-actions',
       ],
   };
   ```
4. To view the storybook locally
    - `yarn run storybook`
5. For the rest of the configuration, refer to the project & [official documentations](https://www.learnstorybook.com/)

## Configuring Jest & React-Testing-Library

1. Install Jest Packages
    - `yarn add --dev jest babel-jest @types/jest react-test-renderer`
2. Install react-testing-library Packages
    - `yarn add --dev @testing-library/react @testing-library/jest-dom`
3. Create configuration file `jest.config.js`
    ```$xslt
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
    ```
4. Create jest setup file `src/tests/jest.setup.js`
    ```$xslt
    import '@testing-library/jest-dom';
    ```
5. Inside `package.json`, add the test script
    ```$xslt
   ...
   "scripts": {
        "test": "jest --coverage"
        "test:watch": "jest --watch"
   }
   ...
    ```
   
## References

The links can be found in the main [README.md](../README.md)