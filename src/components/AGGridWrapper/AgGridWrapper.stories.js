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
    const columnDefs = [
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
    const enableRowSelection = {
        onSelectionChange: action('Select Button Clicked!'),
        multiRowSelection: true,
        showCheckbox: true,
    };
    return (
        <AgGridWrapper
            columnDefs={columnDefs}
            rowData={rowData}
            enableRowSelection={enableRowSelection}
        />
    );
};

export const EnableRowDragging = () => {
    return <AgGridWrapper {...sampleData} enableRowReorder />;
};

export const EnableCellEdits = () => {
    return <AgGridWrapper {...sampleData} enableCellEdits />;
};

export const EnableRowGrouping = () => {
    const columnDefs = [
        {
            headerName: 'Make',
            field: 'make',
            enableRowGroup: true,
        },
        {
            headerName: 'Model',
            field: 'model',
            enableRowGroup: true,
        },
        {
            headerName: 'Price',
            field: 'price',
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
            price: 16000,
        },
        {
            make: 'Porsche',
            model: 'Boxter',
            price: 72000,
        },
        {
            make: 'Toyota',
            model: 'Celica',
            price: 1111111,
        },
        {
            make: 'Ford',
            model: 'Mondeo',
            price: 3333333,
        },
        {
            make: 'Porsche',
            model: 'Boxter',
            price: 2222222,
        },
    ];
    return (
        <AgGridWrapper height='400px' columnDefs={columnDefs} rowData={rowData} enableRowGrouping />
    );
};

export const Charts = () => {
    return <AgGridWrapper {...sampleData} enableCharts />;
};

export const OtherProps = () => {
    const columnDefs = [
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
                        <li />
                    </ol>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm'>
                    <AgGridWrapper columnDefs={columnDefs} rowData={rowData} gridProps={{}} />
                </div>
            </div>
        </div>
    );
};
