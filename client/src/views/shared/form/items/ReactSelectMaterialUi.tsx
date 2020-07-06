import React, {ComponentType} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {emphasize, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

export const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        height: 250,
        minWidth: 290,
    },
    input: {
        display: 'flex',
        padding: 0,
        height: 'auto',
        minHeight: '56px',
    } as any,
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
        paddingLeft: theme.spacing(2),
    } as any,
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light'
                ? theme.palette.grey[300]
                : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        bottom: 6,
        fontSize: 16,
    } as any,
    paper: {
        position: 'absolute',
        zIndex: 2,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    } as any,
    divider: {
        height: theme.spacing(2),
    },
});

function inputComponent({ inputRef, ...props }: { inputRef: any }) {
    return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
    inputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
};

const Control: ComponentType<any> = (props: any) => {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps },
    } = props;

    return (
        <TextField
            InputProps={{
                inputComponent,
                inputProps: {
                    className: classes.input,
                    ref: innerRef,
                    children,
                    ...innerProps,
                },
            }}
            {...TextFieldProps}
        />
    );
};

Control.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.shape({
        onMouseDown: PropTypes.func,
    }),
    innerRef: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    selectProps: PropTypes.object,
};

const Option: ComponentType<any> = (props: any) => {
    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
};

Option.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.shape({
        id: PropTypes.string,
        key: PropTypes.string,
        onClick: PropTypes.func,
        onMouseMove: PropTypes.func,
        onMouseOver: PropTypes.func,
        tabIndex: PropTypes.number,
    }),
    innerRef: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
};

const Placeholder: ComponentType<any> = (props: any) => {
    const { selectProps, innerProps = {}, children } = props;
    return (
        <Typography
            color="textSecondary"
            className={selectProps.classes.placeholder}
            {...innerProps}
        >
            {children}
        </Typography>
    );
};

Placeholder.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object,
};

const SingleValue: ComponentType<any> = (props: any) => {
    return (
        <Typography
            className={props.selectProps.classes.singleValue}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
};

SingleValue.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.any,
    selectProps: PropTypes.object,
};

const ValueContainer: ComponentType<any> = (props: any) => {
    return (
        <div
            className={props.selectProps.classes.valueContainer}
        >
            {props.children}
        </div>
    );
};

ValueContainer.propTypes = {
    children: PropTypes.node,
    selectProps: PropTypes.object,
};

const MultiValue: ComponentType<any> = (props: any) => {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={clsx(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]:
                props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
};

MultiValue.propTypes = {
    children: PropTypes.node,
    isFocused: PropTypes.bool,
    removeProps: PropTypes.shape({
        onClick: PropTypes.func,
        onMouseDown: PropTypes.func,
        onTouchEnd: PropTypes.func,
    }),
    selectProps: PropTypes.object,
};

const Menu: ComponentType<any> = (props: any) => {
    return (
        <Paper
            square
            className={props.selectProps.classes.paper}
            {...props.innerProps}
        >
            {props.children}
        </Paper>
    );
};

Menu.propTypes = {
    children: PropTypes.element,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object,
};

export const components = {
    Control,
    Menu,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};
