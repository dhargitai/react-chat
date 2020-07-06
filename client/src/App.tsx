import * as React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import useSettings, {SettingsProvider} from '~services/SettingsContext';
import {ConnectionProvider} from '~services/ConnectionContext';
import HomePage from '~views/home/HomePage';
import SettingsPage from '~views/settings/SettingsPage';

const AppComponent = () => {
    const {getSetting} = useSettings();

    const theme = createMuiTheme({
        palette: {
            type: getSetting('interfaceColorMode'),
            primary: {
                main: '#4994af',
            },
            secondary: {
                main: '#ffb53d',
            },
        },
    });

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Switch>
                    <Route path="/" exact > <HomePage/> </Route>
                    <Route path="/settings" exact > <SettingsPage/> </Route>
                </Switch>
            </Router>
        </MuiThemeProvider>
    );
};

export default () => (
    <ConnectionProvider>
        <SettingsProvider>
            <AppComponent/>
        </SettingsProvider>
    </ConnectionProvider>
);
