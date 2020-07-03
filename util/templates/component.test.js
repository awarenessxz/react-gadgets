module.exports = componentName => ({
    content: `// Generated with util/create-new-component.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ${componentName} from './${componentName}';
      
// function to render component before each test
const renderComponent = props => {
    return render(<${componentName} {...props} />); // returns methods (refer to api)
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
        it('testing title', () => {
            const title = 'Testing';
            renderComponent({ title: title });
            const label = 'New Component : ' + title;
     
            expect(screen.getByTestId('${componentName}')).toHaveTextContent(label);
        });
    });
});
`,
    extension: `.test.js`,
});
