import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
// Note that: cleanup is called automatically after each test (basically unmounts React trees that were mounted with render)

import SampleWithSub from './SampleWithSub';

// function to render component before each test
const renderComponent = props => {
    return render(<SampleWithSub {...props} />); // returns methods (refer to api)
};

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot testing
    it('Snapshot Testing', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });

    // Testing Dom Elements: check if renders with correct value (Note the usage of data-testid in component)
    describe('component renders with correct state (Testing Dom elements)', () => {
        // Test for all the normal HTML DOM elements
        it('all HTML DOM renders correctly', () => {
            renderComponent();

            expect(screen.getByTestId('counter')).toHaveTextContent('Index = 0');
            expect(screen.getByRole('button', { name: 'Add 1' })).toBeTruthy(); // Test Child Component renders
            expect(screen.getByRole('button', { name: 'Add 3' })).toBeTruthy(); // Test Child Component renders
        });

        // Test if array is rendered correctly
        describe('Test if array list is renderer correctly', () => {
            it('renders list', () => {
                const fakeContacts = [
                    { name: 'Georgie', email: 'Georgie' },
                    { name: 'Sheldon', email: 'Sheldon' },
                    { name: 'Missy', email: 'Missy' },
                ];
                renderComponent({ testingList: fakeContacts });

                // get the list by test Id
                const contactNames = screen.getAllByTestId('usernames').map(li => li.textContent);
                const fakeContactNames = fakeContacts.map(c => c.name);
                expect(contactNames).toEqual(fakeContactNames);
                expect(contactNames).toMatchInlineSnapshot(`
                    Array [
                      "Georgie",
                      "Sheldon",
                      "Missy",
                    ]
                `); // alternative
            });
        });
    });
});

// 2. Testing Events (Eg. onClick)
describe('Testing Events', () => {
    describe('Testing Add / Minus Buttons', () => {
        it('Clicking Add 1', () => {
            renderComponent();
            fireEvent.click(screen.getByRole('button', { name: 'Add 1' }));
            expect(screen.getByTestId('counter')).toHaveTextContent('Index = 1');
        });

        it('Clicking Minus 1', () => {
            renderComponent();
            fireEvent.click(screen.getByRole('button', { name: 'Minus 1' }));
            expect(screen.getByTestId('counter')).toHaveTextContent('Index = -1');
        });

        it('Clicking Add 3', () => {
            renderComponent();
            fireEvent.click(screen.getByRole('button', { name: 'Add 3' }));
            expect(screen.getByTestId('counter')).toHaveTextContent('Index = 3');
        });

        it('Clicking Minus 3', () => {
            renderComponent();
            fireEvent.click(screen.getByRole('button', { name: 'Minus 3' }));
            expect(screen.getByTestId('counter')).toHaveTextContent('Index = -3');
        });
    });

    describe('Testing Select Button', () => {
        const fakeContacts = [
            { name: 'Georgie', email: 'Georgie' },
            { name: 'Sheldon', email: 'Sheldon' },
            { name: 'Missy', email: 'Missy' },
        ];

        it('when index is within boundary & index is not changed', () => {
            renderComponent({ testingList: fakeContacts });
            fireEvent.click(
                screen.getByRole('button', { name: 'Select Row based on index above' })
            );
            expect(screen.getByText(/Selected User:/i)).toHaveTextContent('Selected User: Georgie');
        });

        it('when index is within boundary & index is changed', () => {
            renderComponent({ testingList: fakeContacts });
            fireEvent.click(screen.getByRole('button', { name: 'Add 1' }));
            fireEvent.click(
                screen.getByRole('button', { name: 'Select Row based on index above' })
            );
            expect(screen.getByText(/Selected User:/i)).toHaveTextContent('Selected User: Sheldon');
        });

        it('when index is negative', () => {
            renderComponent({ testingList: fakeContacts });
            fireEvent.click(screen.getByRole('button', { name: 'Minus 1' }));
            fireEvent.click(
                screen.getByRole('button', { name: 'Select Row based on index above' })
            );
            expect(screen.getByText(/Selected User:/i)).toHaveTextContent(
                'Selected User: Error!!!!! Index out of bound'
            );
        });

        it('when index is out of boundary', () => {
            renderComponent({ testingList: fakeContacts });
            fireEvent.click(screen.getByRole('button', { name: 'Add 3' }));
            fireEvent.click(
                screen.getByRole('button', { name: 'Select Row based on index above' })
            );
            expect(screen.getByText(/Selected User:/i)).toHaveTextContent(
                'Selected User: Error!!!!! Index out of bound'
            );
        });
    });
});
