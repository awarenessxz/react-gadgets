import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// Note that: cleanup is called automatically after each test (basically unmounts React trees that were mounted with render)

import SampleWithSub from './SampleWithSub';

// function to render component before each test
const renderComponent = props => {
    return render(<SampleWithSub {...props} />); // returns methods (refer to api)
};

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot testing
    it('Snapshot Testing', () => {
        jest.requireActual('./SubSample/SubSample');
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });

    // Testing Dom Elements: check if renders with correct value (Note the usage of data-testid in component)
    describe('component renders with correct state (Testing Dom elements)', () => {
        // Test for all the normal HTML DOM elements
        it('all HTML DOM renders correctly', () => {
            const { getByTestId } = renderComponent();
            expect(getByTestId('hello')).toHaveTextContent('Hello World');
            expect(getByTestId('counter')).toHaveTextContent('Click Counter = 0');
        });

        // Test if Child Components Renders (via checking some element inside child component)
        it('all child (React) components renders correctly', () => {
            // Renders and Test using toMatch (regex)
            const { getByTestId } = renderComponent();
            expect(getByTestId('button_add')).toHaveTextContent('Add 1');
        });
    });
});

// 2. Testing Events (Eg. onClick)
describe('Testing Events', () => {
    // testing button on click
    describe('Testing Button OnClick', () => {
        it('Trigger Button Add', () => {
            const { getByTestId } = renderComponent();
            fireEvent.click(getByTestId('button_add'));
            expect(getByTestId('counter')).toHaveTextContent('Click Counter = 1');
        });

        it('Trigger Button Minus', () => {
            const { getByTestId } = renderComponent();
            fireEvent.click(getByTestId('button_minus'));
            expect(getByTestId('counter')).toHaveTextContent('Click Counter = -1');
        });
    });
});
