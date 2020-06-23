# react-gadgets

`react-gadgets` is a React Library which contains a collection of custom reusable React Components, documented with storybook and tested using Jest &amp; React-Testing-Library

## Overview

This library was created using the following technology decisions:
- React 
- ES6 (javascript syntax)
- Eslint & Prettier
- Rollup (javascript module bundler) & Babel (javascript transcompiler) for bundling the library and publishing to npm. Below are a brief elaboration on the plugins used:
    - **rollup-plugin-peer-deps-external** -- preventing Rollup from bundling the peer dependencies we've defined in package.json
    - **@rollup/plugin-node-resolve** -- efficiently bundles third party dependencies we've installed in node_modules
    - **@rollup/plugin-commonjs** -- enables transpilation into CommonJS (CJS) format
    - **@babel/plugin-proposal-class-properties** -- transforms static class properties as well as properties declared with the property initializer syntax
    - **@babel/plugin-syntax-dynamic-import** -- Allow parsing of import()
    - **@babel/plugin-proposal-object-rest-spread** -- Compile object rest and spread to ES5
    - **@babel/plugin-transform-arrow-functions** -- Compile ES2015 arrow functions to ES5
    - **@babel/plugin-transform-template-literals** -- Compile ES2015 template literals to ES5 
    - **babel-plugin-transform-react-remove-prop-types** -- Remove unnecessary React propTypes from the production build.
- Storybook (for documenting & developing/testing UI components in isolation).
    - **@storybook/addon-storyshots** -- for structural testing (aka snapshot testing)
    - **@storybook/addon-actions** -- for logging actions
    - **@storybook/addon-docs** -- for documenting component (automatically)
- Jest & React-Testing-Library (for testing).

## Documentation

Refer to the [documentation](./doc/README.md)

## Configuration Issues that you might face

These are possible problems you might faced when trying to setup the configuration for a custom react library

1. Jest fails to run due to misconfiguration (when running `yarn run test`)
    - Details: "Jest encountered an unexpected token. This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript."
    - Solution: create babel.config.js (add @babel/preset-react)
    - Reference: [how to solve jest error with create-react-app](https://medium.com/@audreyhal/how-to-solve-jest-error-with-create-react-app-part-1-80f33aa1661a#:~:text=This%20usually%20means%20that%20you,Here's%20what%20you%20can%20do%3A&text=babelrc%20file%20in%20my%20root%20folder.)
    
2. Rollup is unable to resolve import (when running `yarn run build`)
    - Details: "[!] Error: Could not resolve './components/0-Sample/Sample' from src\index.js. Error: Could not resolve './components/0-Sample/Sample' from src\index.js"
    - Solution: add file extension to resolve
    - Reference: [Rollup Issue with importing jsx files](https://github.com/rollup/rollup/issues/1052)

## References

1. Creating custom react component library
    - [How to create react component library (typescript + rollup + sass + storybook)](https://blog.harveydelaney.com/creating-your-own-react-component-library/)
    - [How to create react component library](https://medium.com/better-programming/lets-build-react-components-library-part-3-b2e7aec478a2)
    - [How to set up react component library with rollup](https://medium.com/grandata-engineering/how-i-set-up-a-react-component-library-with-rollup-be6ccb700333)
    - Babel + Rollup
        - [Setting up React, Webpack and Babel](https://www.valentinog.com/blog/babel/)
        - [React Rollup Boilerplate](https://github.com/KaiHotz/react-rollup-boilerplate)
        - [Babel Plugins](https://babeljs.io/docs/en/plugins/)
        - [Rollup Documentation](https://rollupjs.org/guide/en/#creating-your-first-bundle)
    - Storybook
        - [Storybook Documentation](https://storybook.js.org/docs/basics/introduction/)
    - Testing
        - [Enzyme vs React-Testing-Library vs Cypress](https://medium.com/javascript-in-plain-english/i-tested-a-react-app-with-jest-testing-library-and-cypress-here-are-the-differences-3192eae03850)
        - [Storybook Testing](https://storybook.js.org/docs/testing/react-ui-testing/)
        - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
        - [Test React Apps with Jest](https://jestjs.io/docs/en/tutorial-react)
        - [Configuring jest](https://jestjs.io/docs/en/configuration)
        - [Test React Apps Component with react-test-renderer](https://www.valentinog.com/blog/testing-react/)
    - Eslint + Prettier
        - [How to set up eslint and prettier for your React app](https://thomlom.dev/setup-eslint-prettier-react/)
        - [setting up prettier and eslint for react apps](https://medium.com/dubizzletechblog/setting-up-prettier-and-eslint-for-js-and-react-apps-bbc779d29062)
        - [Testing-Library Rules](https://github.com/testing-library/eslint-plugin-testing-library)
        - [Jest Dom Rules](https://github.com/testing-library/eslint-plugin-jest-dom)
        - [Jest Rules](https://www.npmjs.com/package/eslint-plugin-jest)
       
2. Writing Test using React-Testing-Library & Jest
    - [8 simple steps to start testing react apps using react testing library and jest](https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/)
    - [Advanced React components mocks with jest and react-testing-library](https://medium.com/@ericdcobb/advanced-react-component-mocks-with-jest-and-react-testing-library-f1ae8838400b)
    - [Test Isolation with React](https://kentcdodds.com/blog/test-isolation-with-react)
    - [Understanding Jest Coverage Report](https://medium.com/@krishankantsinghal/how-to-read-test-coverage-report-generated-using-jest-c2d1cb70da8b)

3. Writing Storybook Documentation
    - [Storybook DocsPage (automatically populated)](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/docspage.md)
    - [Storybook Docs MDX (writing custom documentation)](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/mdx.md)

## Credits

## License

[Apache 2.0](LICENSE)

Important Note: This project does not redistribute third party libraries but identifies their availability. The libraries called by this project are subject to their creator licenses. Remember to consult and comply with all licenses in your uses.
