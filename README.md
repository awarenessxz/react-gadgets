# react-gadgets

`react-gadgets` is a React Library which contains a collection of custom reusable React Components, documented with storybook and tested using Jest &amp; React-Testing-Library. The intention is not to re-create the wheel, hence most of the React Component are created using third party libraries and css for the UI design.

## Overview

This library was created using the following technology decisions:

-   React
-   ES6 (javascript syntax)
-   Eslint & Prettier
-   Rollup (javascript module bundler) & Babel (javascript transcompiler) for bundling the library and publishing to npm.
-   Storybook (for documenting & developing/testing UI components in isolation).
-   Jest & React-Testing-Library (for testing).
-   CSS Modules & SASS (for styling)

Refer to the [configuration guide for more details on how to create new library](./doc/CREATE_NEW_LIBRARY.md)

## Usage

1. Installing the library
    - `yarn add react-gadgets`
    - Import the Components
        - `import { Sample } from 'react-gadgets';`
        - `import Sample from 'react-gadgets/dist/esm/Sample';` -- direct import

2. [Using the library locally](./doc/README.md#4-testing-the-library-locally)

## Development

Refer to the [documentation](./doc/README.md) for more details.

## References

1. Creating custom react component library
    - [How to create react component library (typescript + rollup + sass + storybook)](https://blog.harveydelaney.com/creating-your-own-react-component-library/)
    - [How to create react component library](https://medium.com/better-programming/lets-build-react-components-library-part-3-b2e7aec478a2)
    - [How to set up react component library with rollup](https://medium.com/grandata-engineering/how-i-set-up-a-react-component-library-with-rollup-be6ccb700333)
    - [Developing & publishing React component library to NPM (styled-components + Typescript)](https://medium.com/@xfor/developing-publishing-react-component-library-to-npm-styled-components-typescript-cc8274305f5a)
    - [How to write and build JS libraries in 2018](https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953)
    - Babel + Rollup
        - [Setting up React, Webpack and Babel](https://www.valentinog.com/blog/babel/)
        - [React Rollup Boilerplate](https://github.com/KaiHotz/react-rollup-boilerplate)
        - [Babel Plugins](https://babeljs.io/docs/en/plugins/)
        - [Rollup Documentation](https://rollupjs.org/guide/en/#creating-your-first-bundle)
    - Storybook
        - [Storybook Documentation](https://storybook.js.org/docs/basics/introduction/)
        - [Storybook CSS Modules Not Showing](https://github.com/storybookjs/storybook/issues/6055)
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
    - Styling (CSS)
        - [CSS Modules in React](https://programmingwithmosh.com/react/css-modules-react/)
        - [Bundle Libraries With SCSS and CSS Modules Using Rollup](https://florian.ec/blog/rollup-scss-css-modules/)
        - [Bundle Stylesheets and add live reload with rollup](https://www.learnwithjason.dev/blog/learn-rollup-css/)
    - Code Splitting
        - [Code Splitting for libraries bundling for npm with rollup](https://levelup.gitconnected.com/code-splitting-for-libraries-bundling-for-npm-with-rollup-1-0-2522c7437697)
    - Publishing to NPM / Checking it out locally
        - [Complete guide to publishing a React package to npm](https://blog.logrocket.com/the-complete-guide-to-publishing-a-react-package-to-npm/)
        - [React hooks in react library giving Invalid hook call error](https://stackoverflow.com/questions/56021112/react-hooks-in-react-library-giving-invalid-hook-call-error)
        - [Setting a private npm registry publishing ci/cd pipeline](https://blog.harveydelaney.com/setting-up-a-private-npm-registry-publishing-ci-cd-pipeline/)
    - Scripts
        - [Updating package.json](https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js)
        - [How can I use an es6 import in node](https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node)
        - [Change nodejs console log colour](https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)

2. Writing Test using React-Testing-Library & Jest
    - [8 simple steps to start testing react apps using react-testing-library and jest](https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/)
    - [Advanced React components mocks with jest and react-testing-library](https://medium.com/@ericdcobb/advanced-react-component-mocks-with-jest-and-react-testing-library-f1ae8838400b)
    - [Test Isolation with React](https://kentcdodds.com/blog/test-isolation-with-react)
    - [Understanding Jest Coverage Report](https://medium.com/@krishankantsinghal/how-to-read-test-coverage-report-generated-using-jest-c2d1cb70da8b)
    - [Understanding Jest Mock](https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c)
    - [Bypassing Jest Mock](https://jestjs.io/docs/en/bypassing-module-mocks)
    - [Testing Parent and Child seperately](https://github.com/testing-library/react-testing-library/issues/167)
    - [How to write functional tests with react-testing-library](https://blog.echobind.com/writing-functional-tests-with-react-testing-library-part-1-470870ee1a6)
    - [Common mistakes with react-testing-library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
    - [react-testing-library cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
    - [react-testing-library which query to use when testing](https://testing-library.com/docs/guide-which-query)
    - [list of query roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#Roles)

3. Writing Storybook Documentation
    - [Storybook DocsPage (automatically populated)](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/docspage.md)
    - [Storybook Docs MDX (writing custom documentation)](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/mdx.md)

## Credits

- [Harvey Delaney](https://github.com/HarveyD)
- [Jebus](https://medium.com/@jebus)

## License

[Apache 2.0](LICENSE)

Important Note: This project does not redistribute third party libraries but identifies their availability. The libraries called by this project are subject to their creator licenses. Remember to consult and comply with all licenses in your uses.
