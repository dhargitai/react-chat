import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Header from '~views/shared/Header';
import {Container} from '@material-ui/core';
import LoadingIndicator from '~views/layout/LoadingIndicator';
import {i18n} from '~i18n/index';
import {useEffect, useState} from 'react';
import useConnection from '~services/ConnectionContext';

export default (props: any) => {

    const useStyles = makeStyles((theme) => ({
        offset: theme.mixins.toolbar,
    }));

    const classes: any = useStyles();
    const { connectionId } = useConnection();
    const [isWaitingForConnection, setIsWaitingForConnection] = useState(false);

    useEffect(() => {
        setIsWaitingForConnection(!connectionId);
    }, [connectionId]);

    return (
        <>
            <Header />
            <div className={classes.offset} />
            <Container maxWidth="sm">
                {isWaitingForConnection && <LoadingIndicator message={i18n('common.waitingForConnection')} />}

                {!isWaitingForConnection && props.children}
            </Container>
        </>
    );
}
