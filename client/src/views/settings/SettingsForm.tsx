import React, {ComponentPropsWithoutRef} from 'react';
import { Formik } from 'formik';
import model from '~modules/settings/settingsModel';
import FormSchema from '~views/shared/form/formSchema';
import InputFormItem from '~views/shared/form/items/InputFormItem';
import RadioFormItem from '~views/shared/form/items/RadioFormItem';
import SelectFormItem from '~views/shared/form/items/SelectFormItem';
import useSettings from '~services/SettingsContext';

const { fields } = model;

export default (props: ComponentPropsWithoutRef<any>) => {
    const { getSetting } = useSettings();

    const schema = new FormSchema([
        fields.username,
        fields.interfaceColorMode,
        fields.clockType,
        fields.sendOnCtrlEnter,
        fields.language,
    ]);

    const handleSubmit = (values: any) => {
        const { ...data } = schema.cast(values);
        props.onSubmit(data);
    };

    const initialValues = () => {
        const record = props.record;
        const defaultValues = {
            username: getSetting('username'),
            interfaceColorMode: getSetting('interfaceColorMode'),
            clockType: getSetting('clockType'),
            language: getSetting('language'),
            sendOnCtrlEnter: getSetting('sendOnCtrlEnter'),
        };
        return schema.initialValues(record || defaultValues);
    };

    return (
        <Formik
            initialValues={initialValues()}
            validationSchema={schema.schema}
            onSubmit={handleSubmit}
        >
            {(form) => {
                return (
                    <form onSubmit={form.handleSubmit}>
                        <InputFormItem
                            name={fields.username.name}
                            label={fields.username.label}
                            required={fields.username.required}
                            autoFocus
                        />

                        <RadioFormItem
                            name={fields.interfaceColorMode.name}
                            label={fields.interfaceColorMode.label}
                            options={fields.interfaceColorMode.options.map(
                                (item) => ({
                                    value: typeof item === 'object' ? item.id : item,
                                    label: typeof item === 'object' ? item.label : item,
                                }),
                            )}
                            required={fields.interfaceColorMode.required}
                        />

                        <RadioFormItem
                            name={fields.clockType.name}
                            label={fields.clockType.label}
                            options={fields.clockType.options.map(
                                (item) => ({
                                    value: typeof item === 'object' ? item.id : item,
                                    label: typeof item === 'object' ? item.label : item,
                                }),
                            )}
                            required={fields.clockType.required}
                        />

                        <RadioFormItem
                            name={fields.sendOnCtrlEnter.name}
                            label={fields.sendOnCtrlEnter.label}
                            options={fields.sendOnCtrlEnter.options.map(
                                (item) => ({
                                    value: typeof item === 'object' ? item.id : item,
                                    label: typeof item === 'object' ? item.label : item,
                                }),
                            )}
                            required={fields.sendOnCtrlEnter.required}
                        />

                        <SelectFormItem
                            name={fields.language.name}
                            label={fields.language.label}
                            onChange={(e: any) => { console.log('valtas') }}
                            options={fields.language.options.map(
                                (item) => ({
                                    value: typeof item === 'object' ? item.id : item,
                                    label: typeof item === 'object' ? item.label : item,
                                }),
                            )}
                        />

                    </form>
                );
            }}
        </Formik>
    );
}
