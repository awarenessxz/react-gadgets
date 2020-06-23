import React from 'react';
import PropTypes from 'prop-types';

/**
 * Sample Description of the Component (Note: this comment is used in the auto generated documentation)
 */
const Sample = props => {
    const onClickHandler = e => {
        props.onClickHandler('Returning Value');
    };

    return (
        <div>
            <h1 data-testid='label'>Hello {props.title}</h1>
            <button data-testid='button' onClick={onClickHandler}>
                Click Me
            </button>
        </div>
    );
};

Sample.defaultProps = {
    title: 'World',
};

Sample.propTypes = {
    /** Sample Title */
    title: PropTypes.string.isRequired,
    /** Function Handler from parent */
    onClickHandler: PropTypes.func.isRequired,
};

export default Sample;
