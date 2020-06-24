import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
// Note that: cleanup is called automatically after each test (basically unmounts React trees that were mounted with render)

import Sample from './Sample';

// function to render component before each test
const renderComponent = props => {
    const title = 'World';
    const mockOnClick = jest.fn();
    return render(<Sample title={title} onClickHandler={mockOnClick} {...props} />); // returns methods (refer to api)
};

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot testing
    it('Snapshot Testing', () => {
        const { asFragment } = renderComponent(); // Note: refer to api for asFragment
        expect(asFragment()).toMatchSnapshot();
    });

    // Testing Dom Elements: check if renders with correct value (Note the usage of data-testid in component)
    describe('component renders with correct state (Testing Dom elements)', () => {
        it('Text renders properly', () => {
            const labelHello = 'Hello James';
            const title = 'James';
            renderComponent({ title: title });

            // Run debug to view rendered content
            // screen.debug();

            // option 1 (using the data-testid specified in the JSX)
            expect(screen.getByTestId('label_id')).toHaveTextContent(labelHello);
            expect(screen.queryByTestId('label_id')).toBeTruthy();

            // option 2 (using query by text)
            expect(screen.getByText(labelHello)).toBeInTheDocument();
            expect(screen.queryByText(labelHello)).not.toBeNull();
        });

        it('Inputs renders properly', () => {
            renderComponent();

            // Run debug to view rendered content
            // screen.debug();

            // option 1 (using the data-testid specified in the JSX)
            expect(screen.getByTestId('input_id')).toHaveTextContent('');
            expect(screen.queryByTestId('input_id')).toBeTruthy();

            // option 2 (using query by placeholder)
            expect(screen.queryByPlaceholderText('type something...')).toBeTruthy();
        });

        it('buttons renders properly', () => {
            renderComponent();

            // Run debug to view rendered content
            // screen.debug();

            // option 1 (using the data-testid specified in the JSX)
            expect(screen.getByTestId('button_id')).toBeTruthy();
            expect(screen.getByTestId('button_id')).toBeInTheDocument();

            // option 2 (using query by role)
            expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
            expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'Submit' })).toBeTruthy();
            expect(screen.queryByRole('button', { name: 'Submit' })).toBeInTheDocument();

            // additional (checking if button is disabled)
            expect(screen.getByTestId('button_id')).toHaveAttribute('disabled');
            expect(screen.getByTestId('button_id')).toBeDisabled();
        });
    });
});

// 2. Testing Events (Eg. onClick)
describe('Testing Events', () => {
    describe('Testing Input OnChange', () => {
        it('Enter something', () => {
            renderComponent();

            // type something
            fireEvent.change(screen.queryByPlaceholderText('type something...'), {
                target: { value: 'new Text' },
            });
            expect(screen.queryByPlaceholderText('type something...').value).toBe('new Text');
        });
    });

    describe('Testing Button OnClick', () => {
        it('Button is not triggered if input is empty', () => {
            const mockOnClick = jest.fn();
            renderComponent({ onClickHandler: mockOnClick });

            // trigger the click
            fireEvent.click(screen.getByTestId('button_id'));
            expect(mockOnClick).not.toHaveBeenCalled();
            expect(screen.getByTestId('button_id')).toHaveAttribute('disabled');
            expect(screen.getByTestId('button_id')).toBeDisabled();
        });

        it('Button is triggered when input is given', () => {
            const mockOnClick = jest.fn();
            renderComponent({ onClickHandler: mockOnClick });

            // trigger input change
            fireEvent.change(screen.queryByPlaceholderText('type something...'), {
                target: { value: 'new Text' },
            });

            // trigger the click
            fireEvent.click(screen.getByTestId('button_id'));
            expect(mockOnClick).toHaveBeenCalled();
            expect(screen.getByTestId('button_id')).not.toHaveAttribute('disabled');
            expect(screen.getByTestId('button_id')).not.toBeDisabled();
        });
    });
});
