import * as React from 'react'
import Layout from '~views/layout/Layout';
import SettingsForm from '~views/settings/SettingsForm';
import useSettings from '~services/SettingsContext';
import RestoreIcon from '@material-ui/icons/Restore';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import {i18n} from '~i18n/index';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
            width: '100%',
        },
    }),
);

export default () => {
    const { saveSettings, getSettings, resetToDefaults } = useSettings();
    const classes = useStyles();

    return (
        <Layout>
            <h1>{i18n('settings.title')}</h1>

            <SettingsForm
                record={getSettings()}
                onSubmit={(data: any) => {
                    saveSettings(data);
                }}
            />

            <Button
                className={classes.root}
                variant="contained"
                startIcon={<RestoreIcon />}
                onClick={resetToDefaults}
            >
                {i18n('settings.resetToDefaults')}
            </Button>
        </Layout>
    );
}
