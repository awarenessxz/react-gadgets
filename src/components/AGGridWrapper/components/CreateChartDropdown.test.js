import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreateChartDropdown from './CreateChartDropdown';

// function to render component before each test
const renderComponent = props => {
    const defaultProps = {
        onClick: jest.fn(),
    };
    const merged = { ...defaultProps, ...props };
    return render(<CreateChartDropdown {...merged} />); // returns methods (refer to api)
};

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot Testing
    it('Snapshot Testing', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });
});
