# react-gadgets

`react-gadgets` is a React Library which contains a collection of custom reusable React Components, documented with storybook and tested using Jest &amp; React-Testing-Library

## Overview

This library was created using the following technology decisions:
- React 
- ES6 (javascript syntax)
- Eslint & Prettier
- Rollup (javascript module bundler) & Babel (javascript transcompiler) for bundling the library and publishing to npm.
- Storybook (for documenting & developing/testing UI components in isolation).
- Jest & React-Testing-Library (for testing).

Refer to the [configuration guide for more details on how to create new library](./doc/CREATE_NEW_LIBRARY.md)

## Usage

## Development

Refer to the [documentation on how to use this library](./doc/README.md)

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
    - [Understanding Jest Mock](https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c)
    - [Bypassing Jest Mock](https://jestjs.io/docs/en/bypassing-module-mocks)
    - [Testing Parent and Child seperately](https://github.com/testing-library/react-testing-library/issues/167)

3. Writing Storybook Documentation
    - [Storybook DocsPage (automatically populated)](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/docspage.md)
    - [Storybook Docs MDX (writing custom documentation)](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/mdx.md)

## Credits

## License

[Apache 2.0](LICENSE)

Important Note: This project does not redistribute third party libraries but identifies their availability. The libraries called by this project are subject to their creator licenses. Remember to consult and comply with all licenses in your uses.
