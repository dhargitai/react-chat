import React, {ComponentPropsWithoutRef, createContext, useContext, useEffect, useState} from 'react';
import {SettingName, SettingsFields, SettingsService} from '~modules/settings/settingsModel';
import LocalStorageSettingsService from '~services/settings/localStorageSettingsService';
import {setLanguageCode} from '~i18n/index';
import useConnection from '~services/ConnectionContext';

interface SettingsContextFields extends SettingsFields {
    saveSettings: (newSettings: SettingsFields) => void;
    getSetting: (settingName: SettingName) => any;
    getSettings: () => SettingsFields;
    resetToDefaults: () => void;
}

const settingsService: SettingsService = LocalStorageSettingsService;
const SettingsContext = createContext({});

export const SettingsProvider = (props: ComponentPropsWithoutRef<any>) => {
    const children = props.children;
    const defaultSettings: SettingsFields = {
        username: 'Guest0001',
        interfaceColorMode: 'light',
        clockType: '12h',
        sendOnCtrlEnter: 'off',
        language: 'en',
    };

    const { socket, connectionId } = useConnection();

    const [username, setUsername] = useState(defaultSettings.username);
    const [interfaceColorMode, setInterfaceColorMode] = useState(defaultSettings.interfaceColorMode);
    const [clockType, setClockType] = useState(defaultSettings.clockType);
    const [sendOnCtrlEnter, setSendOnCtrlEnter] = useState(defaultSettings.sendOnCtrlEnter);
    const [language, setLanguage] = useState(defaultSettings.language);

    useEffect(() => {
        const savedSettings = settingsService.getSettings();
        if (savedSettings) {
            const settingKeys = Object.keys(savedSettings) as Array<SettingName>;
            for (let i = 0; i < settingKeys.length; i++) {
                saveSetting(settingKeys[i], savedSettings[settingKeys[i]], false);
            }
        }
    }, [connectionId]);

    const resetToDefaults = () => {
        saveSetting('username', defaultSettings.username);
        saveSetting('interfaceColorMode', defaultSettings.interfaceColorMode);
        saveSetting('clockType', defaultSettings.clockType);
        saveSetting('sendOnCtrlEnter', defaultSettings.sendOnCtrlEnter);
        saveSetting('language', defaultSettings.language);
    };

    const saveSettings = (newSettings: SettingsFields) => {
        const settingKeys = Object.keys(newSettings) as Array<SettingName>;
        for (let i = 0; i < settingKeys.length; i++) {
            saveSetting(settingKeys[i], newSettings[settingKeys[i]]);
        }
    };

    const saveSetting = (settingName: SettingName, newValue: any, persist = true) => {
        if (persist) {
            settingsService.saveSetting(settingName, newValue);
        }

        switch (settingName) {
            case 'username':
                setUsername(newValue);

                if (connectionId) {
                    socket.emit('change_username', { username: newValue });
                }

                return;
            case 'interfaceColorMode':
                setInterfaceColorMode(newValue);
                return;
            case 'clockType':
                setClockType(newValue);
                return;
            case 'sendOnCtrlEnter':
                setSendOnCtrlEnter(newValue);
                return;
            case 'language':
                const previousLanguage = language;
                setLanguage(newValue);
                setLanguageCode(newValue);
                if (persist && newValue !== previousLanguage) {
                    window.location.reload();
                }
                return;
            default:
                throw Error(`Unknown setting: "${settingName}"`);
        }
    };

    const getSetting = (settingName: SettingName): any => {
        switch (settingName) {
            case 'username':
                return username;
            case 'interfaceColorMode':
                return interfaceColorMode;
            case 'clockType':
                return clockType;
            case 'sendOnCtrlEnter':
                return sendOnCtrlEnter;
            case 'language':
                return language;
            default:
                throw Error(`Unknown setting: "${settingName}"`);
        }
    };

    const getSettings = (): SettingsFields => {
        return {
            username,
            interfaceColorMode,
            clockType,
            sendOnCtrlEnter,
            language,
        } as SettingsFields;
    };

    return <SettingsContext.Provider value={{
        username,
        interfaceColorMode,
        clockType,
        sendOnCtrlEnter,
        language,
        saveSettings,
        getSetting,
        getSettings,
        resetToDefaults,
    }}>
        {children}
    </SettingsContext.Provider>
};

export default function useSettings(): SettingsContextFields {
    return useContext(SettingsContext) as SettingsContextFields;
};
