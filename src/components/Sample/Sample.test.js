import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// Note that: cleanup is called automatically after each test (basically unmounts React trees that were mounted with render)

import Sample from './Sample';

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot testing
    it('Snapshot Testing', () => {
        const mockOnClick = jest.fn();
        const { asFragment } = render(<Sample onClickHandler={mockOnClick} />); // Note: refer to api for asFragment
        expect(asFragment()).toMatchSnapshot();
    });

    // Testing Dom Elements: check if renders with correct value (Note the usage of data-testid in component)
    describe('component renders with correct state (Testing Dom elements)', () => {
        // function to render component before each test
        const renderComponent = props => {
            const title = 'World';
            const mockOnClick = jest.fn();
            return render(<Sample title={title} onClickHandler={mockOnClick} {...props} />);
        };

        it('renders with correct label', () => {
            const { getByTestId } = renderComponent();
            expect(getByTestId('label')).toHaveTextContent('Hello World');
        });

        it('renders with enabled button', () => {
            const { getByTestId } = renderComponent();
            expect(getByTestId('button')).not.toHaveAttribute('disabled'); // 1st way
            expect(getByTestId('button')).not.toBeDisabled(); // 2nd way
        });
    });
});

// 2. Testing Events (Eg. onClick)
describe('Testing Events', () => {
    // testing button on click
    describe('Testing Button OnClick', () => {
        it('Button is triggered', () => {
            const mockOnClick = jest.fn();
            const { getByTestId } = render(<Sample onClickHandler={mockOnClick} />);
            fireEvent.click(getByTestId('button'));
            expect(mockOnClick).toBeCalled();
        });
    });
});
