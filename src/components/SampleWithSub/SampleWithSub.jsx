import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SubSample from './SubSample/SubSample';

/**
 * Sample Component with Sub Component
 */
const SampleWithSub = props => {
    const [counter, setCounter] = useState(0);
    const [selection, setSelection] = useState('Null');

    const onCounterChange = value => {
        setCounter(counter + value);
    };

    const onSelectClick = () => {
        if (counter < 0 || counter >= props.testingList.length) {
            setSelection('Error!!!!! Index out of bound');
        } else {
            setSelection(props.testingList[counter].name);
        }
    };

    return (
        <div>
            <h1>Select User from List Below</h1>
            <p>There are two parts to this Sample: </p>
            <ol>
                <li>
                    Click on the Add / Minus buttons to change index value. (to demo testing with
                    multiple same child component in parent component)
                </li>
                <li>
                    Select button to select data from a list. (to demo testing data array and error
                    handling)
                </li>
            </ol>
            <h2 data-testid='counter'>Index = {counter}</h2>
            <SubSample onButtonClicks={onCounterChange} />
            <SubSample onButtonClicks={onCounterChange} value={3} />
            <hr />
            <button onClick={onSelectClick}>Select Row based on index above</button>
            <ul>
                {props.testingList.map((item, index) => {
                    return (
                        <li key={index} data-testid='usernames'>
                            {item.name}
                        </li>
                    );
                })}
            </ul>
            <p>Selected User: {selection}</p>
        </div>
    );
};

SampleWithSub.defaultProps = {
    testingList: [
        {
            name: 'Alice',
            email: 'Alice@example.com',
        },
        {
            name: 'Bruce',
            email: 'Bruce@example.com',
        },
        {
            name: 'Charlie',
            email: 'Charlie@example.com',
        },
        {
            name: 'Donnie',
            email: 'Donnie@example.com',
        },
        {
            name: 'Elizabeth',
            email: 'Elizabeth@example.com',
        },
        {
            name: 'Frank',
            email: 'Frank@example.com',
        },
    ],
};

SampleWithSub.propTypes = {
    /** Array of custom data where data example = { name: 'James', email: 'james@example.com' } */
    testingList: PropTypes.array,
};

export default SampleWithSub;
