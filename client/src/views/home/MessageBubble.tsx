import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import useSettings from '~services/SettingsContext';
import moment from 'moment';

export default (props: any) => {

    const { username, message, time, isOwn } = props.message;
    const { getSetting } = useSettings();

    const isOnCurrentDay = (timestamp: number) => {
        const currentMidnight = new Date().setHours(0, 0, 0, 0);
        const timestampDateMidnight = new Date(timestamp).setHours(0, 0, 0, 0);
        return currentMidnight === timestampDateMidnight;
    };
    const formattedTime = moment(time).format(`${!isOnCurrentDay ? 'MMM DD ' : ''}${
        getSetting('clockType') === '12h' ? 'h:mm A' : 'HH:mm'}`);

    const borderRadius = 20;
    const topLeftBorderRadius = !isOwn ? 0 : borderRadius;
    const bottomRightBorderRadius = isOwn ? 0 : borderRadius;
    const background = !isOwn ? '#e4e4e4' : '#4661f3';
    const color = !isOwn ? 'black' : 'white';

    const useStyles = makeStyles((theme) => ({
        metaData: {
            display: 'flex',
            fontSize: '.9em',
            justifyContent: `flex-${isOwn ? 'end' : 'start'} !important`,
            padding: '0 1em',
            color: 'grey',
        },
        bubbleContainer: {
            width: '100%',
            display: 'flex',
            justifyContent: `flex-${isOwn ? 'end' : 'start'} !important`,
        },
        bubble: {
            background,
            color,
            borderRadius: `${topLeftBorderRadius}px ${borderRadius}px ${bottomRightBorderRadius}px ${borderRadius}px`,
            margin: '5px',
            maxWidth: '70%',
            padding: '10px 20px',
            display: 'inline-block',
        }
    }));

    const classes = useStyles();

    return (
        <>
            <span className={classes.metaData}>
                {!isOwn && `${username}, `}
                {formattedTime}
            </span>
            <div className={classes.bubbleContainer}>
                <div className={classes.bubble}>
                    <div dangerouslySetInnerHTML={{
                        __html: message.replace(/(?:\r\n|\r|\n)/g, '<br>'),
                    }} />
                </div>
            </div>
        </>
    );
}
