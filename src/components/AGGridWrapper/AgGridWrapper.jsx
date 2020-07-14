import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import InsertChart from '@material-ui/icons/InsertChart';
import GetApp from '@material-ui/icons/GetApp';
import Redo from '@material-ui/icons/Redo';
import Undo from '@material-ui/icons/Undo';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import ToolButton from './components/ToolButton';
import CreateChartDropdown from './components/CreateChartDropdown';
import styles from './AgGridWrapper.scss';

const AgGridWrapper = props => {
    const gridApi = useRef();
    const columnApi = useRef();
    const [numOfSelectedRows, setNumOfSelectedRows] = useState(0);
    const [isWrapperReady, setIsWrapperReady] = useState(false);
    const [error, setError] = useState('');
    const downloadMenuItems = ['CSV Export', 'Excel Export'];

    // on first load
    useEffect(() => {
        // user enable selection feature
        if (props.enableRowSelection) {
            props.columnDefs[0].checkboxSelection = props.enableRowSelection.showCheckbox;
        }
        props.defaultColDef.editable = props.enableCellEdits;
        props.columnDefs[0].rowDrag = props.enableRowReorder;
        setIsWrapperReady(true);
    }, []);

    // set Ag-grid property for row selection if its enabled
    const getRowSelectionProps = () => {
        if (props.enableRowSelection) {
            return {
                rowSelection: props.enableRowSelection.multiRowSelection ? 'multiple' : 'single',
                rowMultiSelectWithClick: true,
                onSelectionChanged: e => handleSelectedChange(e),
            };
        }
        return null;
    };

    // set Ag-grid property for cell editing if its enabled
    const getCellEditsProps = () => {
        if (props.enableCellEdits) {
            return {
                singleClickEdit: true,
                undoRedoCellEditing: true,
                undoRedoCellEditingLimit: 100,
                enableCellChangeFlash: true,
                stopEditingWhenGridLosesFocus: true,
            };
        }
        return null;
    };

    // set Ag-grid properties for row grouping if its enabled
    const getRowGroupingProps = () => {
        if (props.enableRowGrouping) {
            return {
                groupMultiAutoColumn: true,
                rowGroupPanelShow: 'always',
            };
        }
        return null;
    };

    // returns selected row's data to parent component (if selection is enabled)
    const handleSelectedChange = e => {
        const selectedNodes = gridApi.current.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        setNumOfSelectedRows(selectedData.length);
        props.enableRowSelection.onSelectionChange(selectedData);
    };

    // clears all row selection
    const handleClearAllSelectionRows = e => {
        gridApi.current.deselectAll();
    };

    // handle downloads
    const handleDownload = menuItem => {
        switch (menuItem) {
            case downloadMenuItems[0]:
                // export as csv
                gridApi.current.exportDataAsCsv();
                break;
            case downloadMenuItems[1]:
                // export as excel
                gridApi.current.exportDataAsExcel();
                break;
            default:
                break;
        }
    };

    // handle charts
    const handleCreateChart = params => {
        gridApi.current.createRangeChart(params);
    };

    const renderToolbar = () => {
        return (
            <Toolbar data-testid='toolbar' style={{ background: props.toolbarColor }}>
                <div style={{ flexGrow: 1 }} />
                <div>
                    {props.enableCellEdits && (
                        <Fragment>
                            <ToolButton
                                onClick={() => gridApi.current.undoCellEditing()}
                                icon={Undo}
                                tooltipMsg='Undo Edits (Ctrl + Z)'
                            />
                            <ToolButton
                                onClick={() => gridApi.current.redoCellEditing()}
                                icon={Redo}
                                tooltipMsg='Redo Edits (Ctrl + Y)'
                            />
                        </Fragment>
                    )}
                    {props.enableRowSelection && (
                        <ToolButton
                            icon={IndeterminateCheckBoxIcon}
                            tooltipMsg='Clear Row Selection'
                            onClick={handleClearAllSelectionRows}
                            badgeCount={numOfSelectedRows}
                            buttonType='badge'
                            disable={numOfSelectedRows <= 0}
                        />
                    )}
                    {props.enableCharts && (
                        <ToolButton
                            onClick={handleCreateChart}
                            icon={InsertChart}
                            tooltipMsg='Create Charts'
                            buttonType='dropdown'
                            dropdownContent={
                                <CreateChartDropdown
                                    defaultColumnNames={props.columnDefs.map(colDef => {
                                        if (colDef.headerName) {
                                            return colDef.headerName;
                                        } else {
                                            return colDef.field;
                                        }
                                    })}
                                    defaultColumnFields={props.columnDefs.map(colDef => {
                                        return colDef.field;
                                    })}
                                    onClick={() => {}} // onClick is defined via ToolButton's onClick
                                />
                            }
                        />
                    )}
                    <ToolButton
                        icon={GetApp}
                        tooltipMsg='Download'
                        onClick={handleDownload}
                        buttonType='menu'
                        menuItems={downloadMenuItems}
                    />
                </div>
            </Toolbar>
        );
    };

    return (
        <div data-testid='AgGridWrapper'>
            <Container>
                {error.trim() === '' ? (
                    isWrapperReady && (
                        <Fragment>
                            {props.toolbar === 'top' && renderToolbar()}
                            <div
                                className='ag-theme-alpine'
                                style={{ height: props.height, width: props.width }}>
                                <AgGridReact
                                    onGridReady={params => {
                                        gridApi.current = params.api;
                                        columnApi.current = params.columnApi;
                                    }}
                                    defaultColDef={props.defaultColDef}
                                    columnDefs={props.columnDefs}
                                    rowData={props.rowData}
                                    animateRows={props.animateRows}
                                    enableRangeSelection={props.enableRangeSelection}
                                    statusBar={props.statusBar}
                                    rowDragManaged={props.enableRowReorder}
                                    enableCharts={props.enableCharts}
                                    {...getCellEditsProps()}
                                    {...getRowSelectionProps()}
                                    {...getRowGroupingProps()}
                                    {...props.gridProps}
                                />
                            </div>
                            {props.toolbar === 'bottom' && renderToolbar()}
                        </Fragment>
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
    enableRowSelection: undefined,
    enableRowReorder: false,
    enableRowGrouping: false,
    enableCellEdits: false,
    toolbar: 'top',
    toolbarColor: '#EDEDED',
    height: '400px',
    width: '100%',
    animateRows: true,
    enableRangeSelection: true,
    statusBar: {
        statusPanels: [
            {
                statusPanel: 'agTotalRowCountComponent',
                align: 'left',
            },
            { statusPanel: 'agFilteredRowCountComponent' },
            { statusPanel: 'agSelectedRowCountComponent' },
            { statusPanel: 'agAggregationComponent' },
        ],
    },
    defaultColDef: {
        flex: 1,
        minWidth: 110,
        filter: false,
        editable: false,
        resizable: true,
        sortable: true,
    },
    gridProps: {},
};

AgGridWrapper.propTypes = {
    /** height of AgGrid (in px) */
    height: PropTypes.string,
    /** width of AgGrid (in px or %) */
    width: PropTypes.string,
    /** Tool Bar */
    toolbar: PropTypes.oneOf(['top', 'bottom', 'none']),
    /** Tool Bar Colour */
    toolbarColor: PropTypes.string,
    /** Default Column Definition (Refer to ag-grid documentation) */
    defaultColDef: PropTypes.object,
    /** Columns Definition (Refer to ag-grid documentation) */
    columnDefs: PropTypes.arrayOf(
        PropTypes.shape({
            /** Column field */
            field: PropTypes.string.isRequired,
            /** Column Header */
            headerName: PropTypes.string,
            /** Enable Sorting for column */
            sortable: PropTypes.bool,
            /** Enable Filtering for column */
            filter: PropTypes.bool,
            /** Add checkbox for each row in column */
            checkboxSelection: PropTypes.bool,
            /** Group row -- enterprise only */
            rowGroup: PropTypes.bool,
            /** Enable Row Grouping -- enterprise only */
            enableRowGroup: PropTypes.bool,
            /** Enable Cell Editing */
            editable: PropTypes.bool,
            /** Enable row dragging */
            rowDrag: PropTypes.bool,
            /** Chart Data Type */
            chartDataType: PropTypes.oneOf(['category', 'series', 'excluded', 'undefined']),
        })
    ).isRequired,
    /** Row Data [Note: fields in object MUST MATCH fields defined in columnDefs] */
    rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
    /** Enable Row Selection (Toolbar required for clear All Selection Button) */
    enableRowSelection: PropTypes.shape({
        /** listener for parent component to get selected row's data */
        onSelectionChange: PropTypes.func.isRequired,
        /** single or multi row selection */
        multiRowSelection: PropTypes.bool,
        /** show checkbox in first column */
        showCheckbox: PropTypes.bool,
    }),
    /** Enable Re-ordering of rows */
    enableRowReorder: PropTypes.bool,
    /** Enable Grouping of rows */
    enableRowGrouping: PropTypes.bool,
    /** Enable editing of cells (Note: this is an express settings. To further customize, please refer to ag-grid documentation) */
    enableCellEdits: PropTypes.bool,
    /** Enable Charts */
    enableCharts: PropTypes.bool,
    /** ag-grid: animate rows (refer to ag-grid documentation) */
    animateRows: PropTypes.bool,
    /** ag-grid: allows highlighting of cells via click and drag (refer to ag-grid documentation) */
    enableRangeSelection: PropTypes.bool,
    /** ag-grid: statusBar (refer to ag-grid documentation on how to customize this) */
    statusBar: PropTypes.object,
    /** ag-grid: any other properties (additional that you want to include or you want to override) */
    gridProps: PropTypes.object,
};

export default AgGridWrapper;
