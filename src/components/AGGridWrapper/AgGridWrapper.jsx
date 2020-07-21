import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
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

/*
 * AgGrid Wrapper
 */
class AgGridWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfSelectedRows: 0,
            isWrapperReady: false,
            error: '',
            downloadMenuItems: ['CSV Export', 'Excel Export'],
        };
    }

    componentDidMount() {
        // user enable selection feature
        if (this.props.enableRowSelection) {
            this.props.columnDefs[0].checkboxSelection = this.props.enableRowSelection.showCheckbox;
        }
        this.props.defaultColDef.editable = this.props.enableCellEdits;
        this.props.columnDefs[0].rowDrag = this.props.enableRowReorder;
        this.setState({
            isWrapperReady: true,
        });
    }

    // set Ag-grid property for row selection if its enabled
    getRowSelectionProps = () => {
        if (this.props.enableRowSelection) {
            return {
                rowSelection: this.props.enableRowSelection.multiRowSelection
                    ? 'multiple'
                    : 'single',
                rowMultiSelectWithClick: true,
                onSelectionChanged: e => this.handleSelectedChange(e),
            };
        }
        return null;
    };

    // set Ag-grid property for cell editing if its enabled
    getCellEditsProps = () => {
        if (this.props.enableCellEdits) {
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
    getRowGroupingProps = () => {
        if (this.props.enableRowGrouping) {
            return {
                groupMultiAutoColumn: true,
                rowGroupPanelShow: 'always',
            };
        }
        return null;
    };

    // returns selected row's data to parent component (if selection is enabled)
    handleSelectedChange = e => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        this.setState({
            numOfSelectedRows: selectedData.length,
        });
        this.props.enableRowSelection.onSelectionChange(selectedData);
    };

    // clears all row selection
    handleSelectionCheckbox = e => {
        if (this.state.numOfSelectedRows < this.props.rowData.length) {
            this.gridApi.selectAll();
        } else {
            this.gridApi.deselectAll();
        }
    };

    // handle downloads
    handleDownload = menuItem => {
        switch (menuItem) {
            case this.state.downloadMenuItems[0]:
                // export as csv
                this.gridApi.exportDataAsCsv();
                break;
            case this.state.downloadMenuItems[1]:
                // export as excel
                this.gridApi.exportDataAsExcel();
                break;
            default:
                break;
        }
    };

    // handle charts
    handleCreateChart = params => {
        this.gridApi.createRangeChart(params);
    };

    // renders selection icon
    renderSelectionIcon = () => {
        if (this.state.numOfSelectedRows <= 0) {
            return <CheckBoxOutlineBlank />;
        } else if (this.state.numOfSelectedRows >= this.props.rowData.length) {
            return <CheckBox />;
        } else {
            return <IndeterminateCheckBoxIcon />;
        }
    };

    renderToolbar = () => {
        return (
            <Toolbar data-testid='toolbar' style={{ background: this.props.toolbarColor }}>
                <div style={{ flexGrow: 1 }} />
                <div>
                    {this.props.enableCellEdits && (
                        <Fragment>
                            <ToolButton
                                onClick={() => this.gridApi.undoCellEditing()}
                                icon={Undo}
                                tooltipMsg='Undo Edits (Ctrl + Z)'
                            />
                            <ToolButton
                                onClick={() => this.gridApi.redoCellEditing()}
                                icon={Redo}
                                tooltipMsg='Redo Edits (Ctrl + Y)'
                            />
                        </Fragment>
                    )}
                    {this.props.enableRowSelection && (
                        <ToolButton
                            icon={this.renderSelectionIcon}
                            tooltipMsg={
                                this.state.numOfSelectedRows < this.props.rowData.length
                                    ? 'Select All Rows'
                                    : 'Clear All Selection'
                            }
                            onClick={this.handleSelectionCheckbox}
                            badgeCount={this.state.numOfSelectedRows}
                            buttonType='badge'
                        />
                    )}
                    {this.props.enableCharts && (
                        <ToolButton
                            onClick={this.handleCreateChart}
                            icon={InsertChart}
                            tooltipMsg='Create Charts'
                            buttonType='dropdown'
                            dropdownContent={
                                <CreateChartDropdown
                                    defaultColumnNames={this.props.columnDefs.map(colDef => {
                                        if (colDef.headerName) {
                                            return colDef.headerName;
                                        } else {
                                            return colDef.field;
                                        }
                                    })}
                                    defaultColumnFields={this.props.columnDefs.map(colDef => {
                                        return colDef.field;
                                    })}
                                    onClick={() => {}} // onClick is defined via ToolButton's onClick
                                />
                            }
                        />
                    )}
                    {this.props.enableExport && (
                        <ToolButton
                            icon={GetApp}
                            tooltipMsg='Download'
                            onClick={this.handleDownload}
                            buttonType='menu'
                            menuItems={this.state.downloadMenuItems}
                        />
                    )}
                </div>
            </Toolbar>
        );
    };

    render() {
        return (
            <div data-testid='AgGridWrapper'>
                <Container>
                    {this.state.error.trim() === '' ? (
                        this.state.isWrapperReady && (
                            <Fragment>
                                {this.props.toolbar === 'top' && this.renderToolbar()}
                                <div
                                    className='ag-theme-alpine'
                                    style={{ height: this.props.height, width: this.props.width }}>
                                    <AgGridReact
                                        onGridReady={params => {
                                            this.gridApi = params.api;
                                            this.columnApi = params.columnApi;
                                        }}
                                        defaultColDef={this.props.defaultColDef}
                                        columnDefs={this.props.columnDefs}
                                        rowData={this.props.rowData}
                                        animateRows={this.props.animateRows}
                                        suppressCsvExport={this.props.enableExport}
                                        suppressExcelExport={this.props.enableExport}
                                        enableRangeSelection={this.props.enableRangeSelection}
                                        statusBar={this.props.statusBar}
                                        rowDragManaged={this.props.enableRowReorder}
                                        enableCharts={this.props.enableCharts}
                                        {...this.getCellEditsProps()}
                                        {...this.getRowSelectionProps()}
                                        {...this.getRowGroupingProps()}
                                        {...this.props.gridProps}
                                    />
                                </div>
                                {this.props.toolbar === 'bottom' && this.renderToolbar()}
                            </Fragment>
                        )
                    ) : (
                        <div data-testId='errorMsg' className={styles.error}>
                            {this.state.error}
                        </div>
                    )}
                </Container>
            </div>
        );
    }
}

AgGridWrapper.defaultProps = {
    enableRowSelection: undefined,
    enableRowReorder: false,
    enableRowGrouping: false,
    enableCellEdits: false,
    enableExport: true,
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
    rowData: [],
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
    rowData: PropTypes.arrayOf(PropTypes.object),
    /** Enable Export */
    enableExport: PropTypes.bool,
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
