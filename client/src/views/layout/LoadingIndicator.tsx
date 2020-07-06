import React from 'react';
import {CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {i18n} from '~i18n/index';

export default (props: any) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            height: 'calc(100vh - 64px)',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
        }
    }));

    const classes: any = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress />
            <p>{ props.message ? props.message : i18n('common.loading') }</p>
        </div>
    );
};
