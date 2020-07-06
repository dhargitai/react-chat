import GenericField from '~modules/shared/fields/genericField';
import * as yup from 'yup';

export default class StringField extends GenericField {
    required: boolean;
    matches: RegExp | undefined;
    min: number;
    max: number;

    constructor(
        name: string,
        label: string,
        {
            required = false,
            min = 0,
            max = 255,
            matches = undefined,
        } = {},
    ) {
        super(name, label);

        this.required = required;
        this.matches = matches;
        this.min = min;
        this.max = max;
    }

    forView(value: string) {
        return value;
    }

    forFormInitialValue(value: string) {
        return value;
    }

    forForm() {
        let yupChain = yup
            .string()
            .nullable(true)
            .trim()
            .label(this.label);

        if (this.required) {
            yupChain = yupChain.required();
        }

        if (this.min || this.min === 0) {
            yupChain = yupChain.min(this.min);
        }

        if (this.max) {
            yupChain = yupChain.max(this.max);
        }

        if (this.matches) {
            yupChain = yupChain.matches(this.matches);
        }

        return yupChain;
    }
}
