import React from 'react';
import { action } from '@storybook/addon-actions';

import Sample from './Sample';

// telling storybook the component we are documenting
export default {
    title: 'Sample', // how to refer to the component in the sidebar of the Storybook app,
    component: Sample, // the component itself
    /*  Exports that end in "Data" are not stories and will be excluded */
    excludeStories: /.*Data$/, // exports in the story file that should not be rendered as stories by Storybook.
};

// will be excluded
export const sampleData = {
    title: 'World',
};
export const actionData = {
    onClickHandler: action('Button is Clicked!'),
};

// these are the different permutation of the component (AKA Story)
export const HelloWorld = () => {
    return <Sample { ...sampleData} {...actionData} />;
};
export const SecondWay = () => {
    return <Sample title='Second' onClickHandler={action("Second")} />;
};
