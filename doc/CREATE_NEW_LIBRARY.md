# Quick overview on creating your own library

This is a quick guide to create a custom reusable react library using:
- Rollup
- Sass
- React

Additional Features includes:
- Storybook
- Jest & React-Testing-Library

## 1. Steps to create a React Library

### Initial Set up

1. Install Yarn
2. Install Nodejs
3. Create directory `react-gadgets`
4. Inside react-gadgets folder, run `npm init -y` in the command line

### Configuring Rollup

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
            resolve({
                extensions: ['.js', '.jsx', '.es6', '.es', '.mjs'],
            }),
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

### Configuring Storybook

1. Add Storybook
    - `npx -p @storybook/cli sb init --type react`
    - Make sure the packages `@babel/core` & `babel-loader` are installed
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
    - refer to the next part on css configuration for storybook

### Configuring CSS Style (SASS + CSS Modules)

1. Install packages
    - `yarn add --dev rollup-plugin-postcss node-sass`
2. Install packages required for Storybook
    - `yarn add --dev sass-loader` 
3. Configure rollup (`rollup.config.js`)
    ```$xslt
    ...
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
        }),
        postcss({
            extract: 'dist/styles.css',
            modules: true,
            use: ['sass'],
        }),
    ],
    ...
    ```
4. Customize Storybook’s webpack to add SASS support. Inside `.storybook/main.js`
    ```$xslt
    const path = require('path');
   
    module.exports = {
        ...
        webpackFinal: async config => {
            config.module.rules.push({
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                include: path.resolve(__dirname, '../'),
            });
    
            return config;
        },
        ...
    };
    ```

### Configuring Jest & React-Testing-Library

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
       moduleNameMapper: {
           // Mocks out all these file formats when tests are run
           '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
               'identity-obj-proxy',
           '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
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

## 2. Packages / Plugins / Rules

-   Rollup & Babel
    -   **rollup-plugin-peer-deps-external** -- preventing Rollup from bundling the peer dependencies we've defined in package.json
    -   **@rollup/plugin-node-resolve** -- efficiently bundles third party dependencies we've installed in node_modules
    -   **@rollup/plugin-commonjs** -- enables transpilation into CommonJS (CJS) format
    -   **@babel/plugin-proposal-class-properties** -- transforms static class properties as well as properties declared with the property initializer syntax
    -   **@babel/plugin-syntax-dynamic-import** -- Allow parsing of import()
    -   **@babel/plugin-proposal-object-rest-spread** -- Compile object rest and spread to ES5
    -   **@babel/plugin-transform-arrow-functions** -- Compile ES2015 arrow functions to ES5
    -   **@babel/plugin-transform-template-literals** -- Compile ES2015 template literals to ES5
    -   **babel-plugin-transform-react-remove-prop-types** -- Remove unnecessary React propTypes from the production build.
-   Storybook
    -   **@storybook/addon-storyshots** -- for structural testing (aka snapshot testing)
    -   **@storybook/addon-actions** -- for logging actions
    -   **@storybook/addon-docs** -- for documenting component (automatically)

## 3. Configuration Issues that you might face

These are possible problems you might faced when trying to setup the configuration for a custom react library

1. Jest fails to run due to misconfiguration (when running `yarn run test`)

    - Details: `Jest encountered an unexpected token. This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.`
    - Solution: create babel.config.js (add @babel/preset-react)
    - Reference: [how to solve jest error with create-react-app](https://medium.com/@audreyhal/how-to-solve-jest-error-with-create-react-app-part-1-80f33aa1661a#:~:text=This%20usually%20means%20that%20you,Here's%20what%20you%20can%20do%3A&text=babelrc%20file%20in%20my%20root%20folder.)

2. Rollup is unable to resolve import (when running `yarn run build`)
    - Details: `[!] Error: Could not resolve './components/0-Sample/Sample' from src\index.js.`

    - Solution: add file extension to resolve
    - Reference: [Rollup Issue with importing jsx files](https://github.com/rollup/rollup/issues/1052)

## 4. References

The links can be found in the main [README.md](../README.md)
