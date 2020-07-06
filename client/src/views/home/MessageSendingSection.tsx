import React, {useState} from 'react';
import {Grid, IconButton, TextField} from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import useSettings from '~services/SettingsContext';
import {makeStyles} from '@material-ui/core/styles';
import { i18n } from '~i18n/index';
import useConnection from '~services/ConnectionContext';

const KEY_CODE_ENTER = 13;

export default () => {
    const { getSetting } = useSettings();
    const { socket } = useConnection();

    const useStyles = makeStyles((theme) => ({
        bubbleContainer: {
            width: '100%',
            display: 'flex',
        },
        bubble: {
            border: '0.5px solid black',
            borderRadius: '10px',
            margin: '5px',
            padding: '10px',
            display: 'inline-block'
        },
        sendMessageContainer: {
            marginTop: theme.spacing(2),
        },
        messageInput: {
            flexGrow: 1,
        },
        sendButton: {
            padding: '16px',
        }
    }));

    const classes = useStyles();

    const [message, setMessage] = useState('');

    const send = () => {
        if (message.trim().length) {
            socket.emit('new_message', { message });
            setMessage('');
        }
    };

    const handleKeyCodeSend = (event: React.KeyboardEvent) => {
        const keyCode = (event.keyCode ? event.keyCode : event.which);
        const shouldSend = keyCode === KEY_CODE_ENTER
            && (getSetting('sendOnCtrlEnter') === 'off' || event.ctrlKey);

        if (shouldSend) {
            event.preventDefault();
            send();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            className={classes.sendMessageContainer}
        >
            <TextField
                label={i18n('home.yourMessage')}
                multiline
                variant="outlined"
                className={classes.messageInput}
                rowsMax={4}
                helperText={getSetting('sendOnCtrlEnter') === 'on'
                    ? i18n('home.sendOnCtrlEnter')
                    : i18n('home.sendOnEnter')
                }
                onKeyDown={handleKeyCodeSend}
                value={message}
                onChange={handleChange}
                autoFocus
            />
            <IconButton
                color="primary"
                aria-label={i18n('home.sendMessage')}
                component="span"
                onClick={send}
                className={classes.sendButton}>
                <Send />
            </IconButton>
        </Grid>
    );
}
