import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubSample.scss';

/**
 * Sub Sample Components
 */
const SubSample = props => {
    return (
        <div className={styles.wrapper}>
            <h3>Child Component: </h3>
            <button onClick={() => props.onButtonClicks(props.value)}>Add {props.value}</button>
            <button onClick={() => props.onButtonClicks(-props.value)}>Minus {props.value}</button>
        </div>
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
