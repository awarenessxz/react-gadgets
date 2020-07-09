import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from '@material-ui/core/Container';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import styles from './AgGridWrapper.scss';

const AgGridWrapper = props => {
    const gridApi = useRef();
    const [selectable, setSelectable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // on first load
    useEffect(() => {
        // user enable selection feature
        if (props.enableSelection) {
            props.columnDefs[0].checkboxSelection = props.enableSelection.showCheckbox;
            setSelectable(true);
        }
        setLoading(false);
    }, []);

    // set Ag-grid property for row selection if its enabled
    const getRowSelectionProps = () => {
        if (props.enableSelection) {
            return {
                rowSelection: props.enableSelection.multiRowSelection ? 'multiple' : 'single',
                rowMultiSelectWithClick: true,
            };
        }
        return null;
    };

    // returns selected row's data to parent component (if selection is enabled)
    const handleSelectRows = e => {
        const selectedNodes = gridApi.current.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        props.enableSelection.onSelectButtonClick(selectedData);
    };

    const handleClearAllSelectionRows = e => {
        gridApi.current.deselectAll();
    };

    return (
        <div data-testid='AgGridWrapper'>
            <Container disableGutters>
                {error.trim() === '' ? (
                    loading ? (
                        <div>Loading</div>
                    ) : (
                        <div
                            className='ag-theme-alpine'
                            style={{ height: props.height, width: props.width }}>
                            <AgGridReact
                                onGridReady={params => (gridApi.current = params.api)}
                                columnDefs={props.columnDefs}
                                rowData={props.rowData}
                                {...getRowSelectionProps()}
                                {...props.gridProps}
                            />
                        </div>
                    )
                ) : (
                    <div data-testId='errorMsg' className={styles.error}>
                        {error}
                    </div>
                )}
            </Container>
        </div>
    );
};

AgGridWrapper.defaultProps = {
    enableSelection: undefined,
    toolbar: 'bottom',
    height: '250px',
    width: '600px',
    gridProps: {},
};

AgGridWrapper.propTypes = {
    /** Columns Definition (Refer to AgGrid Documentation) */
    columnDefs: PropTypes.arrayOf(
        PropTypes.shape({
            /** Column Header */
            headerName: PropTypes.string.isRequired,
            /** Column field */
            field: PropTypes.string.isRequired,
            /** Enable Sorting for column */
            sortable: PropTypes.bool,
            /** Enable Filtering for column */
            filter: PropTypes.bool,
            /** Add checkbox for each row in column */
            checkboxSelection: PropTypes.bool,
            /** Enable Group -- enterprise only */
            rowGroup: PropTypes.bool,
            /** Enable Cell Editing */
            editable: PropTypes.bool,
        })
    ).isRequired,
    /** Row Data [Note: fields in object MUST MATCH fields defined in columnDefs] */
    rowData: PropTypes.array.isRequired,
    /** Enable Row Selection */
    enableSelection: PropTypes.shape({
        /** listener for parent component to get selected row's data */
        onSelectButtonClick: PropTypes.func.isRequired,
        /** single or multi row selection */
        multiRowSelection: PropTypes.bool,
        /** show checkbox in first column */
        showCheckbox: PropTypes.bool,
        /** show clear all selection button */
        showClearAllSelectionButton: PropTypes.bool,
    }),
    /** height of AgGrid (in px) */
    height: PropTypes.string,
    /** width of AgGrid (in px or %) */
    width: PropTypes.string,
    /** Tool Bar */
    toolbar: PropTypes.oneOf(['top', 'bottom', 'floating', 'none']),
    /** ag-grid properties (additional that you want to include */
    gridProps: PropTypes.object,
};

export default AgGridWrapper;
