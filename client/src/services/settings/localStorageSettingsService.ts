import {SettingName, SettingsFields, SettingsService} from '~modules/settings/settingsModel';

export const STORAGE_KEY_SETTINGS = 'settings';

const LocalStorageSettingsService: SettingsService = {
    saveSetting: (settingName: SettingName, newValue: any) => {
        const settingsValue = localStorage.getItem(STORAGE_KEY_SETTINGS);
        const settings = settingsValue ? JSON.parse(settingsValue) : {};
        return localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify({
            ...settings,
            [settingName]: newValue,
        }));
    },

    getSettings: (): SettingsFields => {
        const settingsValue = localStorage.getItem(STORAGE_KEY_SETTINGS);
        return settingsValue ? JSON.parse(settingsValue) : null;
    },
};

export default LocalStorageSettingsService;