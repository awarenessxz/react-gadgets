import { addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import { configureActions } from '@storybook/addon-actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.min.css';

// allows console (log/warn/error) to appear in action tab
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// configure addon-actions
configureActions({
    depth: 100,
    // Limit the number of items logged into the actions panel
    limit: 20,
    clearOnStoryChange: true,
});
