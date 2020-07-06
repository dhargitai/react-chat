import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'formik';
import Select from 'react-select';
import {
    components as materialUiComponents,
    styles as materialUiStyles,
} from '~views/shared/form/items/ReactSelectMaterialUi';
import { withStyles } from '@material-ui/core/styles';
import {SelectProps} from '@material-ui/core';

interface Props extends SelectProps {
    form: any;
    label: string|null;
    hint: string|null;
    options: Array<any>;
}

const SelectFormItemNotFast: React.FC<Props> = props => {
    const value = () => {
        const { form, name, options } = props;
        if (name && form.values[name]) {
            return options.find(
                (option) => option.value === form.values[name],
            );
        }

        return '';
    };

    const handleSelect = async (data: any) => {
        const { form, name } = props;
        form.setFieldValue(name, data.value);
        await form.submitForm();
    };

    const {
        label,
        name,
        hint,
        options,
        required,
        placeholder,
        classes,
    } = props;

    const controlStyles = {
        container: (provided: any) => ({
            ...provided,
            width: '100%',
            marginTop: '16px',
            marginBottom: '8px',
        }),
    };

    return (
        <Select
            styles={controlStyles}
            classes={classes}
            value={value()}
            onChange={handleSelect}
            inputId={name}
            TextFieldProps={{
                label,
                required,
                variant: 'outlined',
                fullWidth: true,
                helperText: hint,
                InputLabelProps: {
                    shrink: true,
                },
            }}
            components={materialUiComponents}
            options={options}
            placeholder={placeholder || ''}
        />
    );
};

SelectFormItemNotFast.defaultProps = {
    required: true,
};

SelectFormItemNotFast.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
    hint: PropTypes.string,
    required: PropTypes.bool,
};

const SelectFormItem = (props: any) => (
    <Field name={props.name}>
        {(fieldProps: any) => (
            <SelectFormItemNotFast
                {...props}
                form={fieldProps.form}
            />
        )}
    </Field>
);

export default withStyles(materialUiStyles)(SelectFormItem);
