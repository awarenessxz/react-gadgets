import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * Generic Button for Toolbar
 */
const ToolButton = props => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const prevOpen = useRef(open);

    // return focus to the button when we transitioned from !open -> open
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleDropdownToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleCloseDropdown = e => {
        if (e) {
            if (anchorRef.current && anchorRef.current.contains(e.target)) {
                return;
            }
        }
        setOpen(false);
    };

    const handleMenuItemClick = menuItem => e => {
        props.onClick(menuItem);
        handleCloseDropdown(e);
    };

    const handleOnClickEventFromDropDownContent = params => {
        props.onClick(params);
        handleCloseDropdown();
    };

    const renderIcon = () => {
        const Icon = props.icon;
        if (props.disabledIcon) {
            const DisabledIcon = props.disabledIcon;
            return props.disable ? <DisabledIcon /> : <Icon />;
        } else {
            return <Icon />;
        }
    };

    const renderButtonWithBadge = () => {
        return (
            <Tooltip title={props.tooltipMsg}>
                <span>
                    <IconButton
                        id={props.buttonId}
                        aria-label={props.tooltipMsg}
                        onClick={props.onClick}
                        disabled={props.disable}>
                        <Badge badgeContent={props.badgeCount} color='primary'>
                            {renderIcon()}
                        </Badge>
                    </IconButton>
                </span>
            </Tooltip>
        );
    };

    const renderButtonWithMenu = () => {
        return (
            <Fragment>
                <Tooltip title={props.tooltipMsg}>
                    <IconButton
                        id={props.buttonId}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup='true'
                        onClick={handleDropdownToggle}>
                        {renderIcon()}
                    </IconButton>
                </Tooltip>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                            }}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseDropdown}>
                                    <MenuList autoFocusItem={open} id='menu-list-grow'>
                                        {props.menuItems.map((item, idx) => {
                                            return (
                                                <MenuItem
                                                    key={idx}
                                                    onClick={handleMenuItemClick(item)}>
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Fragment>
        );
    };

    const renderButtonWithDropdown = () => {
        const id = open ? 'transitions-popper' : undefined;
        return (
            <Fragment>
                <Tooltip title={props.tooltipMsg}>
                    <IconButton
                        id={props.buttonId}
                        ref={anchorRef}
                        aria-describedby={id}
                        aria-haspopup='true'
                        onClick={handleDropdownToggle}>
                        {renderIcon()}
                    </IconButton>
                </Tooltip>
                <Popper id={id} open={open} anchorEl={anchorRef.current} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper elevation={3} style={{ padding: '20px', border: '1px solid' }}>
                                {React.cloneElement(props.dropdownContent, {
                                    onClick: handleOnClickEventFromDropDownContent,
                                })}
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </Fragment>
        );
    };

    const renderNormalButton = () => {
        return (
            <Tooltip title={props.tooltipMsg}>
                <IconButton
                    id={props.buttonId}
                    aria-label={props.tooltipMsg}
                    onClick={props.onClick}
                    disabled={props.disable}>
                    {renderIcon()}
                </IconButton>
            </Tooltip>
        );
    };

    const renderButton = () => {
        switch (props.buttonType) {
            case 'badge':
                return renderButtonWithBadge();
            case 'menu':
                return renderButtonWithMenu();
            case 'dropdown':
                return renderButtonWithDropdown();
            case 'normal':
            default:
                return renderNormalButton();
        }
    };

    return <Fragment>{renderButton()}</Fragment>;
};

ToolButton.defaultProps = {
    buttonType: 'normal',
    disable: false,
    dropdownContent: <span>Empty</span>,
};

ToolButton.propTypes = {
    /** tool tip message if there is any */
    tooltipMsg: PropTypes.string.isRequired,
    /** button id */
    buttonId: PropTypes.string.isRequired,
    /** icon */
    icon: PropTypes.object.isRequired,
    /** callback */
    onClick: PropTypes.func.isRequired,
    /** disable button */
    disable: PropTypes.bool,
    /** disabled icon */
    disabledIcon: PropTypes.object,
    /** Button Type */
    buttonType: PropTypes.oneOf(['normal', 'badge', 'menu', 'dropdown']),
    /** badge counter (is Required when buttonType = "badge") */
    badgeCount: PropTypes.number,
    /** menu items (is Required when buttonType = "menu") */
    menuItems: PropTypes.arrayOf(PropTypes.string),
    /** dropdown Content -- Eg. <ReactComponent /> (is Required when buttonType = "dropdown") */
    dropdownContent: PropTypes.object,
};

export default ToolButton;
