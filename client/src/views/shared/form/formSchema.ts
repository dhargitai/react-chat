import * as yup from 'yup';
import {ObjectSchema, Shape} from 'yup';
import GenericField from '~modules/shared/fields/genericField';

export default class FormSchema {
    fields: Array<GenericField>;
    schema: ObjectSchema;

    constructor(fields: Array<GenericField>) {
        this.fields = fields;
        this.schema = this.buildSchema();
    }

    initialValues(record: any = {}) {
        const initialValues: any = {};

        this.fields.forEach((field) => {
            initialValues[field.name] = field.forFormInitialValue(
                record[field.name],
            );
        });

        return initialValues;
    }

    buildSchema() {
        const shape: Shape<object, any> = {};

        this.fields.forEach((field) => {
            shape[field.name] = field.forForm();
        });

        return yup.object().shape(shape);
    }

    cast(values: any) {
        return this.schema.cast(values);
    }
}
