import React from 'react';

import SampleWithSub from './SampleWithSub';
import SubSample from './SubSample/SubSample';

// telling storybook the component we are documenting
export default {
    title: 'Welcome|SampleV2', // how to refer to the component in the sidebar of the Storybook app,
    component: SampleWithSub, // the component itself
    subcomponents: { SubSample }, // for documenting the child components
};

/************************************************
 * Stories (different permutation of the component)
 ************************************************/

// Note: the first story will be the 'example component' used for DocPage (documentation which are auto generated)
export const SampleWithSubComponent = () => {
    return <SampleWithSub />;
};
