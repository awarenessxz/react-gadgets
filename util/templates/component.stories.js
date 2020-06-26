module.exports = componentName => ({
    content: `// Generated with util/create-new-component.js
import React from 'react';
import ${componentName} from './${componentName}';

export default {
    title: 'Component|${componentName}', // how to refer to the component in the sidebar of the Storybook app,
    component: ${componentName}, // the component itself
}
      
/************************************************
 * Stories (different permutation of the component)
 ************************************************/
      
// Note: the first story will be the 'example component' used for DocPage (documentation which are auto generated)
export const Basic = () => {
    return <${componentName} />;
};

export const WithParams = () => {
    return <${componentName} title='Testing' />;
};
`,
    extension: `.stories.js`,
});
