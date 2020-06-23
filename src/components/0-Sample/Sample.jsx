import React  from 'react';
import PropTypes from 'prop-types';

const Sample = props => {
    const onClickHandler = e => {
        props.onClickHandler("Returning Value");
    };

    return (
        <div>
            <h1 data-testid="label">Hello {props.title}</h1>
            <button data-testid="button" onClick={onClickHandler}>Click Me</button>
        </div>
    );
};

Sample.defaultProps = {
    title: "World"
};

Sample.propTypes = {
    title: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired,
};

export default Sample;
