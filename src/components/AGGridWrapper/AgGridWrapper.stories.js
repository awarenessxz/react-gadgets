import React from 'react';
import { action } from '@storybook/addon-actions';
import AgGridWrapper from './AgGridWrapper';

// telling storybook the component we are documenting
export default {
    title: 'Components|AgGridWrapper', // how to refer to the component in the sidebar of the Storybook app,
    component: AgGridWrapper, // the component itself
    /*  Exports that end in "Data" are not stories and will be excluded */
    excludeStories: /.*Data$/, // exports in the story file that should not be rendered as stories by Storybook.
};

/************************************************
 * Mock Data (which will be excluded in stories)
 ************************************************/

const sampleData = {
    columnDefs: [
        {
            headerName: 'Make',
            field: 'make',
        },
        {
            headerName: 'Model',
            field: 'model',
            filter: true,
        },
        {
            headerName: 'Price',
            field: 'price',
            sortable: true,
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

/************************************************
 * Stories (different permutation of the component)
 ************************************************/

// Note: the first story will be the 'example component' used for DocPage (documentation which are auto generated from component)
export const Basic = () => {
    return (
        <div style={{ margin: '20px' }}>
            <AgGridWrapper {...sampleData} />
        </div>
    );
};

export const EnableSelection = () => {
    const enableSelection = {
        onSelectButtonClick: action('Select Button Clicked!'),
        multiRowSelection: true,
        showCheckbox: true,
        showClearAllSelectionButton: true,
    };
    return <AgGridWrapper {...sampleData} enableSelection={enableSelection} />;
};

export const OtherProps = () => {
    const columnDefs = [
        {
            headerName: 'Make',
            field: 'make',
            editable: true,
        },
        {
            headerName: 'Model',
            field: 'model',
            editable: true,
        },
        {
            headerName: 'Price',
            field: 'price',
            editable: true,
        },
    ];
    const rowData = [
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
    ];
    return (
        <div className='container' style={{ padding: '20px' }}>
            <div className='row'>
                <div className='col-sm'>
                    <h3>Other Cool Ag-Grid Features: </h3>
                    <ol>
                        <li>
                            Add <b>enableRangeSelection</b> to <u>gridProps</u> to allow user to
                            click and select multiple rows & columns. Useful for copying
                        </li>
                        <li>
                            Add <b>rowDragManaged</b> to <u>gridProps</u> to allow user to re-order
                            columns
                        </li>
                        <li>
                            Add <b>editable</b> property in the <u>columnDefs</u> to enable user to
                            edit values in cells.
                            <ul>
                                <li>
                                    Adding <b>singleClickEdit</b> to <u>gridProps</u> allows cell to
                                    enter edit mode as soon as it is clicked
                                </li>
                            </ul>
                        </li>
                    </ol>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm'>
                    <AgGridWrapper
                        columnDefs={columnDefs}
                        rowData={rowData}
                        gridProps={{
                            enableRangeSelection: true,
                            rowDragManaged: true,
                            singleClickEdit: true,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
