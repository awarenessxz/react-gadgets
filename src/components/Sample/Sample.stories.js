import React from 'react';
import { action } from '@storybook/addon-actions';

import Sample from './Sample';

// telling storybook the component we are documenting
export default {
    title: 'Welcome|Sample', // how to refer to the component in the sidebar of the Storybook app,
    component: Sample, // the component itself
    /*  Exports that end in "Data" are not stories and will be excluded */
    excludeStories: /.*Data$/, // exports in the story file that should not be rendered as stories by Storybook.
};

/************************************************
 * Mock Data (which will be excluded in stories)
 ************************************************/

const sampleData = {
    title: 'World',
};

const actionData = {
    onClickHandler: action('Button is Clicked!'),
};

/************************************************
 * Stories (different permutation of the component)
 ************************************************/

// Note: the first story will be the 'example component' used for DocPage (documentation which are auto generated from component)
export const HelloWorld = () => {
    return <Sample {...sampleData} {...actionData} />;
};

export const SecondWay = () => {
    return <Sample title='Second' onClickHandler={action('Second Way')} />;
};

/************************************************
 * Add Description to the stories
 ************************************************/

SecondWay.story = {
    parameters: {
        docs: {
            storyDescription: 'Another way to create Sample Component',
        },
    },
};
