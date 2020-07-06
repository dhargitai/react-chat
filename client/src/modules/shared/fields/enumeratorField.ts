import GenericField from '~modules/shared/fields/genericField';
import { isString } from 'lodash';
import * as yup from 'yup';
import { i18n } from '~i18n/index';

declare type Option = string | { id: string; label: string; };

export default class EnumeratorField extends GenericField {
    options: Array<Option>;
    required: boolean;

    constructor(
        name: string,
        label: string,
        options: Array<Option>,
        { required = false } = {},
    ) {
        super(name, label);
        this.options = options || [];
        this.required = required;
    }

    _id(option: Option) {
        if (!option) {
            return option;
        }

        if (isString(option)) {
            return option;
        }

        return option.id;
    }

    _label(option: Option) {
        if (!option) {
            return option;
        }

        if (isString(option)) {
            return option;
        }

        return option.label;
    }

    forView(value: Option) {
        const option = this.options.find(
            (option) => (typeof option === 'string' ? option : option.id) === this._id(value),
        );

        if (option) {
            return this._label(option);
        }

        return value;
    }

    forFormInitialValue(value: Option) {
        return this._id(value);
    }

    forForm() {
        let yupChain = yup
            .string()
            .nullable(true)
            .label(this.label)
            .oneOf([
                undefined,
                ...this.options.map((option) => this._id(option)),
            ]);

        if (this.required) {
            yupChain = yupChain.required(
                i18n('validation.string.selected'),
            );
        }

        return yupChain;
    }
}
