import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Sub Sample Components
 */
const SubSample = props => {
    return (
        <Fragment>
            <button data-testid='button_add' onClick={() => props.onButtonClicks(1)}>
                Add 1
            </button>
            <button data-testid='button_minus' onClick={() => props.onButtonClicks(-1)}>
                Minus 1
            </button>
        </Fragment>
    );
};

SubSample.propTypes = {
    /** Button Click Handler */
    onButtonClicks: PropTypes.func.isRequired,
};

export default SubSample;
