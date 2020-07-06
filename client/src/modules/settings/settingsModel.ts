import {i18n, LanguageCode} from '~i18n/index';
import StringField from '~modules/shared/fields/stringField';
import EnumeratorField from '~modules/shared/fields/enumeratorField';

export type SettingName = 'username' | 'interfaceColorMode' | 'clockType' | 'sendOnCtrlEnter' | 'language';

export interface SettingsFields {
    username: string;
    interfaceColorMode: 'dark' | 'light';
    clockType: '12h' | '24h';
    sendOnCtrlEnter: 'on' | 'off';
    language: LanguageCode;
}

export interface SettingsService {
    saveSetting: (settingName: SettingName, newValue: any) => void;
    getSettings: () => SettingsFields;
}

function label(name: string) {
    return i18n(`settings.fields.${name}`);
}

function enumeratorLabel(name: string, value: string) {
    return i18n(`settings.enumerators.${name}.${value}`);
}

const fields = {
    username: new StringField('username', label('username'), {
        "min": 2,
        "max": 255
    }),

    interfaceColorMode: new EnumeratorField('interfaceColorMode', label('interfaceColorMode'), [
        { id: 'light', label: enumeratorLabel('interfaceColorMode', 'light') },
        { id: 'dark', label: enumeratorLabel('interfaceColorMode', 'dark') },
    ], {}),

    clockType: new EnumeratorField('clockType', label('clockType'), [
        { id: '12h', label: enumeratorLabel('clockType', '12h') },
        { id: '24h', label: enumeratorLabel('clockType', '24h') },
    ], {}),

    sendOnCtrlEnter: new EnumeratorField('sendOnCtrlEnter', label('sendOnCtrlEnter'), [
        { id: 'on', label: enumeratorLabel('sendOnCtrlEnter', 'on') },
        { id: 'off', label: enumeratorLabel('sendOnCtrlEnter', 'off') },
    ], {}),

    language: new EnumeratorField('language', label('language'), [
        { id: 'en', label: enumeratorLabel('language', 'en') },
        { id: 'hu', label: enumeratorLabel('language', 'hu') },
    ], {}),
};

export default {
    fields,
};
