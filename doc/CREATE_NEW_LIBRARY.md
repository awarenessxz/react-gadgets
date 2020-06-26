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
                extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', 'node'],
            }),
            commonjs(),
            babel({
                exclude: ['node_modules/**', 'dist'],
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
    - `yarn add --dev @storybook/addon-docs @storybook/addon-storysource @storybook/addon-console`
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
4. Add configuration for addon
    ```$xslt
    import { addDecorator } from '@storybook/react';
    import { withConsole } from '@storybook/addon-console';
    
    addDecorator((storyFn, context) => withConsole()(storyFn)(context)); // allows console (log/warn/error) to appear in action tab
    ```
5. Update `rollup.config.js`
    ```$xslt
    plugins: [
        ...
        babel({
            ...
            exclude: ['node_modules/**', 'dist', 'src/**/*.stories.*'],
            ...
        }),
        ...
    ],
    ```
5. To view the storybook locally
    - `yarn run storybook`
6. For the rest of the configuration, refer to the project & [official documentations](https://www.learnstorybook.com/)
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
        postcss({
            modules: true,
            extensions: ['css', 'scss'],
            use: ['sass'],
        }),
        ...
    ],
    ...
    ```
4. Customize Storybook’s webpack to add SASS & CSS module support. Inside `.storybook/main.js`
    ```$xslt
    const path = require('path');
   
    module.exports = {
        ...
        webpackFinal: async config => {
            config.module.rules.push({
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
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
3. Install other Packages
    - `yarn add --dev identity-obj-proxy` -- required for mocking css modules
4. Create configuration file `jest.config.js`
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
5. Create jest setup file `src/tests/jest.setup.js`
    ```$xslt
    import '@testing-library/jest-dom';
    ```
6. Inside `package.json`, add the test script
    ```$xslt
    ...
    "scripts": {
        "test": "jest"
        "test:watch": "jest --watch"
    }
    ...
    ```
7. Update `rollup.config.js`
   ```$xslt
   plugins: [
       ...
       babel({
           ...
           exclude: ['node_modules/**', 'dist', 'src/**/*.test.js*', 'src/**/*.stories.*'],
           ...
       }),
       ...
   ],
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

## 3. Additional Configuration

### Code-Splitting [Optional]

This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. **TLDR:** Code Splitting allows user to direct import the components that they need from the library instead of all the components. This is a popular approach as it reduces the amount of javascript codes sent to the client. 

1. Update `rollup.config.js` to support different formats of output. We are using `dir` instead of `files` as there will be more than one bundle for each format.
    ```$xslt
    ...
    input: packageJson.source,
    output: [
        {
            dir: packageJson.target.cjs,
            format: 'cjs',
            sourcemap: true,
        },
        {
            dir: packageJson.target.esm,
            format: 'esm',
            sourcemap: true,
        },
    ],
    ...
    ```
2. Update `package.json`. If a tool can support `ECMAScript`, it'll use `module` else it'll use `main`. 
    ```$$xslt
    ...
    "main": "dist/cjs/index.js",
    "module": "dist/esm/index.js",
    "source": {
        "index": "./src/index.js",
        "sample": "./src/components/Sample/Sample.jsx"
        "samplewithsub": "./src/components/SampleWithSub/SampleWithSub.jsx"
    },
    "target": {
        "cjs": "dist/cjs",
        "esm": "dist/esm"
    },
    "files": [
        "dist/cjs/*",
        "dist/esm/*"
    ],
    ...
    ```
3. Build the library `yarn run build` and you should see more than one bundle.js generated.

4. When using the library, 
    - `import { Sample } from 'react-gadgets';` -- import all components inside the library
    - `import Sample from 'react-gadgets/esm/sample';` -- import only sample component (direct import)
    
## 4. Configuration Issues that you might face

These are possible problems you might faced when trying to setup the configuration for a custom react library

1. Jest fails to run due to misconfiguration (when running `yarn run test`)

    - Details: `Jest encountered an unexpected token. This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.`
    - Solution: create babel.config.js (add @babel/preset-react)
    - Reference: [how to solve jest error with create-react-app](https://medium.com/@audreyhal/how-to-solve-jest-error-with-create-react-app-part-1-80f33aa1661a#:~:text=This%20usually%20means%20that%20you,Here's%20what%20you%20can%20do%3A&text=babelrc%20file%20in%20my%20root%20folder.)

2. Rollup is unable to resolve import (when running `yarn run build`)
    - Details: `[!] Error: Could not resolve './components/0-Sample/Sample' from src\index.js.`
    - Solution: add file extension to resolve
    - Reference: [Rollup Issue with importing jsx files](https://github.com/rollup/rollup/issues/1052)

3. Jest fails to run when components imports css modules
    - Details:
        ````$xslt
        C:\..\react-gadgets\src\components\Sample\Sample.scss:1
        ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){.test_component {
                                                                                                     ^
        
        SyntaxError: Unexpected token '.'
    
          1 | import React, { useState } from 'react';
          2 | import PropTypes from 'prop-types';
        > 3 | import styles from './Sample.scss';
            | ^
          4 |
    
          at Runtime.createScriptFromCode (../node_modules/jest-runtime/build/index.js:1258:14)
          at Object.<anonymous> (components/Sample/Sample.jsx:3:1)
        ````
    - Solution: Add `moduleNameMapper` in `jest.config.js`
    - Reference: [Jest doesn't works with JSX which imports CSS](https://github.com/facebook/jest/issues/3094)

## 5. References

The links can be found in the main [README.md](../README.md#references)
