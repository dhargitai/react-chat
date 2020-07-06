import * as React from 'react';
import {AppBar, Toolbar, Button, Badge} from '@material-ui/core';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {i18n} from '~i18n/index';
import {makeStyles} from '@material-ui/core/styles';
import useConnection from '~services/ConnectionContext';

export default () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },

        onSimpleText: {
            '& > .MuiBadge-badge': {
                right: '-.5em',
            }
        },

        active: {
            '& > .MuiButton-label': {
                borderBottom: '1px solid',
                fontWeight: 'bold',
            }
        }
    }));

    const classes: any = useStyles();
    const location = useLocation();
    const { numberOfNewMessages } = useConnection();

    return (
        <AppBar position="fixed" className={classes.root}>
            <Toolbar>
                <Button
                    color="inherit"
                    component={RouterLink}
                    to="/"
                    className={location.pathname === '/' ? classes.active : ''}
                >
                    {numberOfNewMessages === 0 && i18n('pages.home')}

                    {numberOfNewMessages > 0 && <Badge badgeContent={numberOfNewMessages} color="secondary" className={classes.onSimpleText}>
                        {i18n('pages.home')}
                    </Badge>}

                </Button>

                <Button
                    color="inherit"
                    component={RouterLink}
                    to="/settings"
                    className={location.pathname === '/settings' ? classes.active : ''}
                >
                    {i18n('pages.settings')}
                </Button>
            </Toolbar>
        </AppBar>
    );
}
