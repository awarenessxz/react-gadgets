import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import { ensureGridApiHasBeenSet } from '../../tests/ag-grid-test-utility';
import { AgGridReact } from 'ag-grid-react';
import AgGridWrapper from './AgGridWrapper';
import ToolButton from './components/ToolButton';
import { IconButton } from '@material-ui/core';

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

// function to render component before each test
const renderComponent = props => {
    const merged = { ...defaultProps, ...props };
    return render(<AgGridWrapper {...merged} />); // returns methods (refer to api)
};

// function to mount component before each test (for enzyme)
const mountComponent = () => {
    const props = {
        enableRowSelection: {
            onSelectionChange: jest.fn(),
            multiRowSelection: true,
            showCheckbox: true,
        },
    };
    const merged = { ...defaultProps, ...props };
    return mount(<AgGridWrapper {...merged} />);
};

// Suppress console.error (https://til.hashrocket.com/posts/hrhejhqg2n-turn-off-console-error-messages-in-a-test)
let originalError;
beforeEach(() => {
    originalError = console.error;
    console.error = jest.fn();
});
afterEach(() => {
    console.error = originalError;
});

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

// 3. Testing Ag-Grid Related (probably not required)
describe('Testing Ag-Grid Related', () => {
    let component = null;
    let agGridReact = null;

    beforeEach(done => {
        component = mountComponent();
        agGridReact = component.find(AgGridReact).instance();
        // don't start our tests until the grid is ready
        ensureGridApiHasBeenSet(component).then(() => done());
    });

    afterEach(() => {
        component.unmount();
        agGridReact = null;
    });

    it('Testing row de-selection when selection is enabled', () => {
        expect(agGridReact.api.getSelectedRows()).toHaveLength(0);
        agGridReact.api.selectAll();
        expect(agGridReact.api.getSelectedRows()).toHaveLength(3);
        const toolButton = component.findWhere(
            n => n.name() === 'IconButton' && n.prop('aria-label') === 'Clear Row Selection'
        );
        console.log(toolButton.debug());
        toolButton.simulate('click', {});
        expect(agGridReact.api.getSelectedRows()).toHaveLength(0);
    });
});
