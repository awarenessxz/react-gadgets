import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Sample Description of the Component (Note: this comment is used in the auto generated documentation)
 */
const Sample = props => {
    const [inputValue, setInputvalue] = useState('');
    const [disabled, setDisabled] = useState(true);

    const handleChange = e => {
        const { value } = e.target;
        setInputvalue(value);
        const isEmpty = value.trim() === '';
        setDisabled(isEmpty);
    };

    const onClickHandler = e => {
        props.onClickHandler(`Returning Value: ${inputValue}`);
    };

    return (
        <div>
            <h1 data-testid='label_id'>Hello {props.title}</h1>
            <p>Type something to enable the Submit button</p>
            <input
                data-testid='input_id'
                placeholder='type something...'
                value={inputValue}
                onChange={handleChange}
            />
            <button data-testid='button_id' onClick={onClickHandler} disabled={disabled}>
                Submit
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
