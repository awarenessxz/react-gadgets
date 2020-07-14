import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Styles from '../AgGridWrapper.scss';

const CreateChartDropdown = props => {
    const [title, setTitle] = React.useState('');
    const [startRowIndex, setStartRowIndex] = React.useState(1);
    const [endRowIndex, setEndRowIndex] = React.useState(3);
    const [columnNames, setColumnNames] = React.useState(props.defaultColumnNames);
    const [isAllCellRange, setIsAllCellRange] = React.useState(true);
    const [showLegend, setShowLegend] = React.useState(true);
    const [legendPlacement, setLegendPlacement] = React.useState('right');
    const [chartType, setChartType] = React.useState('groupedColumn');
    const [chartPalette, setChartPalette] = React.useState('bright');
    const chartTypes = [
        'groupedColumn',
        'stackedColumn',
        'normalizedColumn',
        'groupedBar',
        'stackedBar',
        'normalizedBar',
        'line',
        'scatter',
        'bubble',
        'pie',
        'doughnut',
        'area',
        'stackedArea',
        'normalizedArea',
    ];
    const chartPalettes = ['borneo', 'material', 'pastel', 'bright', 'flat'];
    const legendPlacements = ['top', 'right', 'bottom', 'left'];

    const getColumnFieldsMapping = () => {
        return columnNames.map(value => {
            const index = props.defaultColumnNames.indexOf(value);
            return props.defaultColumnFields[index];
        });
    };

    const getParams = () => {
        return {
            cellRange: {
                rowStartIndex: isAllCellRange ? undefined : startRowIndex - 1,
                rowEndIndex: isAllCellRange ? undefined : endRowIndex - 1,
                columns: getColumnFieldsMapping(),
            },
            chartType: chartType,
            chartPalette: chartPalette,
            processChartOptions: function (params) {
                const opts = params.options;
                if (title.trim() !== '') {
                    opts.title.enabled = true;
                    opts.title.text = title;
                }
                opts.legend.enabled = showLegend;
                opts.legend.position = legendPlacement;
                opts.seriesDefaults.tooltip.renderer = function (params) {
                    const titleStyle = params.color
                        ? ' style="color: white; background-color:' + params.color + '"'
                        : '';
                    const title = params.title
                        ? '<div class="ag-chart-tooltip-title"' +
                          titleStyle +
                          '>' +
                          params.title +
                          '</div>'
                        : '';
                    const value = params.datum[params.yKey]
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    return (
                        title +
                        '<div class="ag-chart-tooltip-content" style="text-align: center">' +
                        value +
                        '</div>'
                    );
                };
                return opts;
            },
        };
    };

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <h4 style={{ margin: '5px 0' }}>Create Charts</h4>
                    <Divider />
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems='center'>
                <Grid item xs={5}>
                    Chart Title
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        id='chartTitle'
                        label='can be empty'
                        onChange={e => setTitle(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems='center'>
                <Grid item xs={5}>
                    Columns
                </Grid>
                <Grid item xs={7}>
                    <FormControl className={Styles.inputControlLength}>
                        <Select
                            multiple
                            value={columnNames}
                            onChange={e => setColumnNames(e.target.value)}
                            input={<Input />}
                            renderValue={selected => selected.join(', ')}>
                            {props.defaultColumnNames.map((name, index) => {
                                return (
                                    <MenuItem key={index} value={name}>
                                        <Checkbox checked={columnNames.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems='center'>
                <Grid item xs={5}>
                    Cell Range
                </Grid>
                <Grid item xs={7}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isAllCellRange}
                                onChange={() => setIsAllCellRange(!isAllCellRange)}
                                name='chartCellRange'
                            />
                        }
                        label={isAllCellRange ? 'All Rows' : 'Customized'}
                    />
                </Grid>
            </Grid>
            {!isAllCellRange && (
                <React.Fragment>
                    <Grid container spacing={3} alignItems='center'>
                        <Grid item xs={1} />
                        <Grid item xs={6}>
                            Start Row No.
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id='chartStartRow'
                                value={startRowIndex}
                                onChange={e => setStartRowIndex(parseInt(e.target.value))}
                                type='number'
                                style={{ maxWidth: '80px' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} alignItems='center'>
                        <Grid item xs={1} />
                        <Grid item xs={6}>
                            End Row No.
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id='chartEndRow'
                                value={endRowIndex}
                                onChange={e => setEndRowIndex(parseInt(e.target.value))}
                                type='number'
                                style={{ width: '80px' }}
                            />
                        </Grid>
                    </Grid>
                </React.Fragment>
            )}
            <Grid container spacing={3} alignItems='center'>
                <Grid item xs={5}>
                    Chart Type
                </Grid>
                <Grid item xs={7}>
                    <FormControl className={Styles.inputControlLength}>
                        <Select value={chartType} onChange={e => setChartType(e.target.value)}>
                            {chartTypes.map((name, index) => {
                                return (
                                    <MenuItem key={index} value={name}>
                                        {name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems='center'>
                <Grid item xs={5}>
                    Chart Palette
                </Grid>
                <Grid item xs={7}>
                    <FormControl className={Styles.inputControlLength}>
                        <Select
                            value={chartPalette}
                            onChange={e => setChartPalette(e.target.value)}>
                            {chartPalettes.map((name, index) => {
                                return (
                                    <MenuItem key={index} value={name}>
                                        {name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems='center'>
                <Grid item xs={5}>
                    Chart Legend
                </Grid>
                <Grid item xs={7}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showLegend}
                                onChange={() => setShowLegend(!showLegend)}
                                name='chartLegend'
                            />
                        }
                        label={showLegend ? 'Show' : 'Hide'}
                    />
                </Grid>
            </Grid>
            {showLegend && (
                <Grid container spacing={3} alignItems='center'>
                    <Grid item xs={1} />
                    <Grid item xs={6}>
                        Placement
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl style={{ width: '80px' }}>
                            <Select
                                value={legendPlacement}
                                onChange={e => setLegendPlacement(e.target.value)}>
                                {legendPlacements.map((name, index) => {
                                    return (
                                        <MenuItem key={index} value={name}>
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            )}
            <Grid container spacing={1} justify='flex-end' style={{ marginTop: '20px' }}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => props.onClick(getParams())}>
                    Create
                </Button>
            </Grid>
        </div>
    );
};

CreateChartDropdown.defaultProps = {
    defaultColumnNames: [],
};

CreateChartDropdown.propTypes = {
    /** list of all column header in grid */
    defaultColumnNames: PropTypes.arrayOf(PropTypes.string),
    /** list of all column header field in grid */
    defaultColumnFields: PropTypes.arrayOf(PropTypes.string),
    /** callback */
    onClick: PropTypes.func.isRequired,
};

export default CreateChartDropdown;
