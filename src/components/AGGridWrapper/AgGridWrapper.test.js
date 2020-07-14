import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AgGridWrapper from './AgGridWrapper';
import { action } from '@storybook/addon-actions';

// function to render component before each test
const renderComponent = props => {
    const defaultProps = {
        columnDefs: [
            {
                headerName: 'Make',
                field: 'make',
            },
            {
                headerName: 'Model',
                field: 'model',
            },
            {
                headerName: 'Price',
                field: 'price',
            },
        ],
        rowData: [
            {
                make: 'Toyota',
                model: 'Celica',
                price: 35000,
            },
            {
                make: 'Ford',
                model: 'Mondeo',
                price: 32000,
            },
            {
                make: 'Porsche',
                model: 'Boxter',
                price: 72000,
            },
        ],
    };
    const merged = { ...defaultProps, ...props };
    return render(<AgGridWrapper {...merged} />); // returns methods (refer to api)
};

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot Testing
    it('Snapshot Testing', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });

    // Testing Dom Elements: check if renders with correct value (Note the usage of data-testid in component)
    describe('component renders with correct state (Testing Dom Elements)', () => {
        describe('Toolbar renders correctly', () => {
            it('toolbar = "none"', () => {
                renderComponent({ toolbar: 'none' });
                expect(screen.queryByTestId('toolbar')).toBeNull();
            });

            it('toolbar = "top"', () => {
                renderComponent({ toolbar: 'top' });
                expect(screen.getByTestId('toolbar')).toBeInTheDocument();
            });

            it('toolbar = "bottom"', () => {
                renderComponent({ toolbar: 'bottom' });
                expect(screen.getByTestId('toolbar')).toBeInTheDocument();
            });
        });

        describe('Toolbar Buttons renders correctly', () => {
            it('default state, download button is rendered', () => {
                renderComponent();
                screen.getByRole('button', { name: 'Download' });
            });

            it('when selection is enabled, clear selection button is rendered', () => {
                const enableRowSelection = {
                    onSelectionChange: jest.fn(),
                    multiRowSelection: true,
                    showCheckbox: true,
                };
                renderComponent({ enableRowSelection: enableRowSelection });
                screen.getByRole('button', { name: 'Clear Row Selection' });
            });

            it('when cell edit is enabled, redo and undo button is rendered', () => {
                renderComponent({ enableCellEdits: true });
                screen.getByRole('button', { name: 'Undo Edits (Ctrl + Z)' });
                screen.getByRole('button', { name: 'Redo Edits (Ctrl + Y)' });
            });

            it('when charts is enabled, create charts button is rendered', () => {
                renderComponent({ enableCharts: true });
                screen.getByRole('button', { name: 'Create Charts' });
            });
        });
    });
});

// 2. Testing Events (Eg. onClick)
describe('Testing Events', () => {
    describe('Testing row de-selection when selection is enabled', () => {});
});
