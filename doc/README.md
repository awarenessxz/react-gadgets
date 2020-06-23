# Documentation

## Usage

## Development

### Testing

1. `yarn run test` : runs jest and check for test coverage (should be used in your CI/CD pipeline)
2. `yarn run test:watch`: should be used when you're running your tests locally (they will re-run whenever a file is changed).
    - *Note: press `u` to update snapshot if you make changes to any components*
3. `yarn run lint` : check for code consistency

#### Additional Testing Notes
- Jest / React-Testing-Library Basics
    - `it or test`: describes the test itself. It takes as parameters the name of the test and a function that holds the tests.
    - `describe`: is a way to group the test. We use it to define user behaviour
    - `expect`: the condition that the test needs to pass. It will compare the received parameter to a matcher.
    - `render`: the method used to render a given component.
        - *Note: the [render method](https://testing-library.com/docs/react-testing-library/api) returns several methods we can use to test our features.*
- Types of Testing done:
    1. Structural Testing (via Storybook addon "StoryShots" which is an integration of Jest's Snapshot)
        - Refer to `src/tests/storybook.snapshot.test.js` for the implementation of structural testing for stories
        - Refer to `src/components/0-Sample/Sample.test.js` for the implementation of snapshot testing for components
        - Snapshot Testing is done automatically when running `yarn run test`
    2. Behaviour Driven Testing
        - The idea of react-testing-library is to reproduce actions a user would do to the application.  
        - Using `describe`, we try to group similar user actions.     
    3. CSS / Style Testing
- Coverage
    - Running `yarn run test` will prints the coverage. Some basics on jest coverage:
        - **Function Coverage (% Funcs)** -- Has each function in the program been called? 
        - **Statement Coverage (% Stmts)** -- Has each statement in the program been executed?
        - **Branch Coverage (% Branch)** -- Has each branch of each control structure (such as if-else / switch) been executed?
        - **Line Coverage(% Lines)** -- Has each executable line in the source file been executed?

### Building

1. `yarn install` -- install the node packages
2. `yarn run build` -- build the library

### Storybook

1. `yarn run storybook` -- run storybook
2. `http://localhost:6006` -- open in internet browser to view storybook locally

### Creating new component

Follow the steps below to add additional components to `react-gadgets`

## Installing Component Library Locally

## Publishing

## Setting up Project in IntelliJ [Optional]

- [Set up Prettier](https://www.jetbrains.com/help/idea/prettier.html#ws_prettier_reformat_code)
- [File Watcher](https://blog.jetbrains.com/webstorm/2016/08/using-external-tools/)
    - Install File Watcher Plugin.
    - Go to `File -> Settings -> Tools -> FileWatcher` and click on the `+` button
    - Add the following config
        - ![Prettier-jsx](images/filewatcher_1.png)
        - ![Prettier-js](images/filewatcher_2.png)
        - ![Eslint-jsx](images/filewatcher_3.png)
        - ![Eslint-js](images/filewatcher_4.png)