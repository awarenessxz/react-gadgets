import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SubSample from './SubSample/SubSample';

/**
 * Sample Component with Sub Component
 */
const SampleWithSub = props => {
    const [counter, setCounter] = useState(0);

    const onCounterChange = value => {
        setCounter(counter + value);
    };

    return (
        <div>
            <h1 data-testid='hello'>Hello {props.title}</h1>
            <h2 data-testid='counter'>Click Counter = {counter}</h2>
            <SubSample onButtonClicks={onCounterChange} />
        </div>
    );
};

SampleWithSub.defaultProps = {
    title: 'World',
};

SampleWithSub.propTypes = {
    /** Sample Title */
    title: PropTypes.string.isRequired,
};

export default SampleWithSub;
