import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'formik';
import {
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormControl,
    RadioGroupProps,
} from '@material-ui/core';

interface Props extends RadioGroupProps {
    form: any;
    label: string|null;
    options: Array<{id: string; label: string; value: any;}>;
    required?: boolean|undefined;
}

export const RadioFormItemNotFast: React.FC<Props> = props => {
    const {
        label,
        name,
        form,
        options,
        required,
    } = props;

    return (
        <FormControl
            style={{ display: 'flex', marginTop: '16px' }}
            required={required}
            component="fieldset"
        >
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
                id={name}
                name={name}
                value={name && form.values[name] ? form.values[name] : null}
                onChange={async (event) => {
                    form.setFieldValue(name, event.target.value);
                    form.setFieldTouched(name);
                    await form.submitForm();
                }}
                row
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

RadioFormItemNotFast.defaultProps = {
    required: false,
};

RadioFormItemNotFast.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
};

const RadioFormItem = (props: any) => {
    return (
        <Field name={props.name}>
            {(fieldProps: any) => (
                <RadioFormItemNotFast
                    {...props}
                    form={fieldProps.form}
                />
            )}
        </Field>
    );
};

export default RadioFormItem;
