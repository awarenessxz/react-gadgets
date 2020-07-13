import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Styles from '../AgGridWrapper.scss';

const CreateChartDropdown = props => {
    const [columnNames, setColumnNames] = React.useState(props.defaultColumnNames);
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

    const handleColumnSelectChange = e => {
        setColumnNames(e.target.value);
    };

    const handleChartTypeSelectChange = e => {
        setChartType(e.target.value);
    };

    const handleChartPaletteSelectChange = e => {
        setChartPalette(e.target.valueOf);
    };

    const getParams = () => {
        return {
            cellRange: {
                columns: columnNames,
            },
            chartType: chartType,
            chartPalette: chartPalette,
        };
    };

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <strong>Create Charts</strong>
                    <Divider />
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems='center'>
                <Grid item xs={4}>
                    Columns
                </Grid>
                <Grid item xs>
                    <FormControl className={Styles.chartFormControl}>
                        <Select
                            multiple
                            value={columnNames}
                            onChange={handleColumnSelectChange}
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
                <Grid item xs={4}>
                    Chart Type
                </Grid>
                <Grid item xs>
                    <FormControl className={Styles.chartFormControl}>
                        <Select value={chartType} onChange={handleChartTypeSelectChange}>
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
                <Grid item xs={4}>
                    Chart Palette
                </Grid>
                <Grid item xs>
                    <FormControl className={Styles.chartFormControl}>
                        <Select value={chartPalette} onChange={handleChartPaletteSelectChange}>
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
    /** callback */
    onClick: PropTypes.func.isRequired,
};

export default CreateChartDropdown;
