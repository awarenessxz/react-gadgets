# Documentation

## Development

### 1. Important Notes!

#### 1.1 File naming convention

-   React Components / Test / Story (Eg. MyComponent.jsx / MyComponent.test.js / MyComponent.story.js) -- **CamelCase**
-   Javascript Files (Eg. my-component.js) -- **small letter with dashes**
-   Markdown (eg. README.md) -- **usually CAPS**

#### 1.2 Possible Issues

These are possible issues you might faced when coding your React components

1. jest.mock factory doesn't work inside a test.
    - **Details:** using jest.mock() to mock a React component does not work if you place it inside test/it/describe functions
    - **Solution:**
    - Reference: [jest.mock factory doesn't work inside a test](https://github.com/facebook/jest/issues/2582)
            
#### 1.3 Writing Test Cases

-   The library is tested using a combination of `jest` and `react-testing-library`. In particular, `react-testing-library` is meant for replicating user's actions. Hence, test cases should revolve around that
-   Use `describe` to group test cases
-   `Structural Testing` is automatically generated using `@storybook/addon-storyshots` but developers can always follow the sample do `snapshot testing`
-   Use `data-testid` in your HTML Dom for easy reference when testing
-   For components with child components, follow this logic
    -   **E2E test (on Parent) is the preferred approach, as this is how the user experiences the functionality.**
    -   **If Child contains local logic which is not exposed to the Parent via props - like internal state management - then it makes sense to test the Child separately to cover that extra logic.**

### 2. Running the Library Locally

Before you begin...
- Run `yarn install` to install the packages

#### 2.1 Creating new component

##### Quick Start

- Run the script using `yarn run create-new-component <FileName>` to generate a component folder.
- _Note: FileName should be **camel case**_

##### Manual Way

Follow the steps below to add additional components to `react-gadgets`:

1. Create a folder for your component inside `src/components` folder
2. Using Test-Driven Development approach [optional], create test cases first before coding the component. Create a unit test `<Name>.test.js`
    - Run `yarn test:watch` to run the unit tests -- use this when developing
    - Run `yarn test` to get test coverage
3. Create your React Component `<Name>.jsx`
4. If you require CSS for your components, create a scss file `<Name>.scss`
5. To view your React Component locally, create a story `<Name>.stories.js`
    - Run `yarn run storybook` && check your component in `http://localhost:6006/`
    - Note:
        - Changes are usually automatically reloaded
        - Documentations in storybook are automatically generated thanks to `@storybook/addon-docs`

#### 2.2 Testing

1. `yarn run test` -- runs jest and check for test coverage (should be used in your CI/CD pipeline)
2. `yarn run test:watch` -- should be used when you're running your tests locally (they will re-run whenever a file is changed).
    - _Note: press `u` to update snapshot if you make changes to any components_
3. `yarn run lint` -- check for code consistency

###### Additional Testing Notes

-   Jest / React-Testing-Library Basics
    -   `it or test`: describes the test itself. It takes as parameters the name of the test and a function that holds the tests.
    -   `describe`: is a way to group the test. We use it to define user behaviour
    -   `expect`: the condition that the test needs to pass. It will compare the received parameter to a matcher.
    -   `render`: the method used to render a given component.
        -   _Note: the [render method](https://testing-library.com/docs/react-testing-library/api) returns several methods we can use to test our features._
-   Types of Testing done:
    1. Structural Testing (via Storybook addon "StoryShots" which is an integration of Jest's Snapshot)
        - Refer to `src/tests/storybook.snapshot.test.js` for the implementation of structural testing for stories
        - Refer to `src/components/0-Sample/Sample.test.js` for the implementation of snapshot testing for components
        - Snapshot Testing is done automatically when running `yarn run test`
    2. Behaviour Driven Testing
        - The idea of react-testing-library is to reproduce actions a user would do to the application.
        - Using `describe`, we try to group similar user actions.
    3. CSS / Style Testing
-   Coverage
    -   Running `yarn run test` will prints the coverage. Some basics on jest coverage:
        -   **Function Coverage (% Funcs)** -- Has each function in the program been called?
        -   **Statement Coverage (% Stmts)** -- Has each statement in the program been executed?
        -   **Branch Coverage (% Branch)** -- Has each branch of each control structure (such as if-else / switch) been executed?
        -   **Line Coverage(% Lines)** -- Has each executable line in the source file been executed?

#### 2.3 Building

1. `yarn install` -- install the node packages
2. `yarn run build` -- build the library

##### Notes:

- `react-gadgets` outputs two bundle in two different javascript module formats (`CommonJS (cjs)`, `ES Modules (esm)`) 
- `code-spliting`
    - Rollup accepts multiple entry point when bundling the library to allow user to import only the necessary chunks of the library instead of importing the entire library when they only require 1 component.
    - However, these entry points have to be added in manually when creating new components. To simplify the process, a simple script (`auto-generate-entry-points`) is run automatically when building the library to extract all the entry points specified inside `src/index.js`

#### 2.4 Storybook

1. `yarn run storybook` -- run storybook
2. `http://localhost:6006` -- open in internet browser to view storybook locally

### 3. Publishing to NPM

### 4. Testing the library locally

Instead of publishing to NPM to test the library, you can follow these steps to test the library locally before publishing.

1. create a project using `npx create-react-app example`
2. Inside `react-gadgets` folder
    - use `yarn link` to create a link to the library
    - build the library `yarn run build`
3. Inside `example` project folder
    - run `yarn link react-gadgets` -- to link the library to example
    - run `yarn add react-gadgets` -- to install the library
    - inside `app.js`, import the component (eg. `import { Sample } from 'react-gadgets';`) and add the component (`<Sample />`)
    - start the application `yarn start`
4. You should receive the following error 
    ```$xslt
    Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
    1. You might have mismatching versions of React and the renderer (such as React DOM)
    2. You might be breaking the Rules of Hooks
    3. You might have more than one copy of React in the same app
    See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
    ```
    - **Solution:** This is because the library is using a different version of React from your existing project. To resolve, follow the steps:
        1. In your project (`example`)
            - `cd node_modules/react && yarn link`
            - `cd node_modules/react-dom && yarn link`
        2. In your library (`react-gadgets`)
            - `yarn link react`
            - `yarn link react-dom` 
            - `yarn run build`
        3. In your project (`example`)
            - `yarn start`
5. Happy testing

## Setting up Project in IntelliJ [Optional]

-   [Set up Prettier](https://www.jetbrains.com/help/idea/prettier.html#ws_prettier_reformat_code)
-   [File Watcher](https://blog.jetbrains.com/webstorm/2016/08/using-external-tools/)
    -   Install File Watcher Plugin.
    -   Go to `File -> Settings -> Tools -> FileWatcher` and click on the `+` button
    -   Add the following config
        -   ![Prettier-jsx](images/filewatcher_1.png)
        -   ![Prettier-js](images/filewatcher_2.png)
        -   ![Eslint-jsx](images/filewatcher_3.png)
        -   ![Eslint-js](images/filewatcher_4.png)
