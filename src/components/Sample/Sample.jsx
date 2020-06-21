import React from 'react';
import PropTypes from 'prop-types';

const Sample = props => {
    return (
        <div>
            <h1>Hello {props.title}</h1>
            <button onClick={props.onClickHandler}>Click Me</button>
        </div>
    );
};

Sample.propTypes = {
    title: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired,
};

export default Sample;
