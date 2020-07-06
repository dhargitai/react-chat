import { styled } from '@material-ui/core/styles';

const ChatContainer = styled('div')({
    marginTop: '16px',
    padding: '24px',
    width: '100%',
    border: '1px solid #dee2e6 !important',
    borderRadius: '5px',
    bottom: '0',
    display: 'block',
    height: 'calc(100vh - 250px)',
    overflowY: 'auto',
});

export default ChatContainer;
