import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Sub Sample Components
 */
const SubSample = props => {
    return (
        <Fragment>
            <h3>Child Component: </h3>
            <button onClick={() => props.onButtonClicks(props.value)}>Add {props.value}</button>
            <button onClick={() => props.onButtonClicks(-props.value)}>Minus {props.value}</button>
        </Fragment>
    );
};

SubSample.defaultProps = {
    value: 1,
};

SubSample.propTypes = {
    /** Amount of increment/decrement by */
    value: PropTypes.number,
    /** Button Click Handler */
    onButtonClicks: PropTypes.func.isRequired,
};

export default SubSample;
