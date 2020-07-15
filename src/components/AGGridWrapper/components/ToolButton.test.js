import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ToolButton from './ToolButton';
import GetApp from '@material-ui/icons/GetApp';

// function to render component before each test
const renderComponent = props => {
    const defaultProps = {
        tooltipMsg: 'Tooltip Message',
        icon: GetApp, // for mocking only (just a random icon in material-ui)
        onClick: jest.fn(),
    };
    const merged = { ...defaultProps, ...props };
    return render(<ToolButton {...merged} />); // returns methods (refer to api)
};

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot Testing
    it('Snapshot Testing', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });

    // Testing Dom Elements: check if renders with correct value (Note the usage of data-testid in component)
    describe('component renders with correct state (Testing Dom Elements)', () => {
        it('buttonType="normal" renders properly', () => {
            const toolTip = 'normal button';
            renderComponent({ buttonType: 'normal', tooltipMsg: toolTip });
            expect(screen.getByRole('button', { name: toolTip })).toBeTruthy();
        });

        it('buttonType="badge" renders properly', () => {
            const toolTip = 'badge button';
            const badgeCount = 5;
            renderComponent({ buttonType: 'badge', tooltipMsg: toolTip, badgeCount: badgeCount });
            expect(screen.getByRole('button', { name: toolTip })).toBeTruthy();
            expect(screen.getByText(badgeCount.toString())).toBeTruthy();
        });

        it('buttonType="menu" renders properly', () => {
            const toolTip = 'menu button';
            const menuItems = ['menu 1', 'menu 2'];
            renderComponent({ buttonType: 'menu', tooltipMsg: toolTip, menuItems: menuItems });
            expect(screen.getByRole('button', { name: toolTip })).toBeTruthy();
        });

        it('buttonType="dropdown" renders properly', () => {
            const toolTip = 'dropdown button';
            const clickFn = jest.fn();
            const MockComponent = () => <div>Hello World</div>;
            renderComponent({
                buttonType: 'dropdown',
                tooltipMsg: toolTip,
                dropdownContent: <MockComponent />,
                onClick: clickFn,
            });
            expect(screen.getByRole('button', { name: toolTip })).toBeTruthy();
            // opens dropdown
            fireEvent.click(screen.getByRole('button', { name: toolTip }));
            expect(screen.queryByText('Hello World')).toBeInTheDocument();
        });

        describe('disabled button', () => {
            it('renders properly', () => {
                const toolTip = 'disabled button';
                renderComponent({ disabled: true, tooltipMsg: toolTip });
                expect(screen.getByRole('button', { name: toolTip })).toBeDisabled();
            });

            it('with different disabled icon renders properly', () => {
                const toolTip = 'disabled button';
                renderComponent({ disabled: true, disabledIcon: GetApp, tooltipMsg: toolTip });
                expect(screen.getByRole('button', { name: toolTip })).toBeDisabled();
            });
        });
    });
});

// 2. Testing Events (Eg. onClick)
describe('Testing Events', () => {
    describe('onClick is called', () => {
        it('when ToolButton[type="normal"] is clicked', () => {
            const toolTip = 'normal button';
            const clickFn = jest.fn();
            renderComponent({
                buttonType: 'normal',
                tooltipMsg: toolTip,
                onClick: clickFn,
            });
            fireEvent.click(screen.getByRole('button', { name: toolTip }));
            expect(clickFn).toHaveBeenCalled();
        });

        it('when ToolButton[type="badge"] is clicked', () => {
            const toolTip = 'badge button';
            const clickFn = jest.fn();
            renderComponent({
                buttonType: 'badge',
                tooltipMsg: toolTip,
                badgeCount: 5,
                onClick: clickFn,
            });
            fireEvent.click(screen.getByRole('button', { name: toolTip }));
            expect(clickFn).toHaveBeenCalled();
        });

        it('when menu item in ToolButton[type="menu"] is clicked', () => {
            const toolTip = 'menu button';
            const menuItems = ['menu 1', 'menu 2'];
            const clickFn = jest.fn();
            renderComponent({
                buttonType: 'menu',
                tooltipMsg: toolTip,
                menuItems: menuItems,
                onClick: clickFn,
            });
            // opens menu
            fireEvent.click(screen.getByRole('button', { name: toolTip }));
            // click on menu item
            fireEvent.click(screen.getByRole('menuitem', { name: menuItems[0] }));
            expect(clickFn).toHaveBeenCalled();
        });

        it('when onClick is called in ToolButton[type="dropdown"] is clicked', () => {
            const toolTip = 'dropdown button';
            const clickFn = jest.fn();
            const MockComponent = props => <button onClick={props.onClick}>Hello World</button>;
            renderComponent({
                buttonType: 'dropdown',
                tooltipMsg: toolTip,
                dropdownContent: <MockComponent />,
                onClick: clickFn,
            });
            // opens dropdown
            fireEvent.click(screen.getByRole('button', { name: toolTip }));
            // trigger click
            fireEvent.click(screen.getByRole('button', { name: 'Hello World' }));
            expect(clickFn).toHaveBeenCalled();
        });
    });
});
