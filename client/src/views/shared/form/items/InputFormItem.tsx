import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'formik';
import {BaseTextFieldProps, TextField} from '@material-ui/core';

interface Props extends BaseTextFieldProps {
    form: any;
    hint: string|null;
    inputProps: any;
    errorMessage: string|null;
}

export const InputFormItemNotFast: React.FC<Props> = props => {
    const {
        label,
        name,
        form,
        hint,
        type,
        placeholder,
        autoFocus,
        autoComplete,
        inputProps,
        required,
    } = props;

    return <TextField
        id={name}
        type={type}
        label={label}
        required={required}
        margin="normal"
        fullWidth
        variant="outlined"
        onChange={(event) => {
            form.setFieldValue(name, event.target.value);
            form.setFieldTouched(name);
        }}
        onBlur={async () => {
            await form.submitForm();
        }}
        value={name && form.values[name] ? form.values[name] : ''}
        placeholder={placeholder || undefined}
        autoFocus={autoFocus || undefined}
        autoComplete={autoComplete || undefined}
        InputLabelProps={{
            shrink: true,
        }}
        helperText={hint}
        {...inputProps}
    />;
};

InputFormItemNotFast.defaultProps = {
    type: 'text',
    required: false,
};

InputFormItemNotFast.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    type: PropTypes.string,
    label: PropTypes.string,
    hint: PropTypes.string,
    autoFocus: PropTypes.bool,
    prefix: PropTypes.string,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    inputProps: PropTypes.object,
};

const InputFormItem = (props: any) => {
    return (
        <Field name={props.name}>
            {(fieldProps: any) => (
                <InputFormItemNotFast
                    {...props}
                    form={fieldProps.form}
                />
            )}</Field>
    );
};

export default InputFormItem;
