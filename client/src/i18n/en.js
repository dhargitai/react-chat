const en = {
  common: {
    waitingForConnection: 'Waiting for connection...',
    loading: 'Loading...',
    newMessage: 'New message',
  },

  pages: {
    home: 'Chat',
    settings: 'Settings',
  },

  home: {
    sendOnCtrlEnter: 'Send on Ctrl + Enter',
    sendOnEnter: 'Send on Enter',
    yourMessage: 'Your message',
    sendMessage: 'Send message',
  },

  settings: {
    title: 'Settings',
    resetToDefaults: 'Reset to defaults',
    save: {
      success:
        'Settings saved successfully. The page will reload in {0} seconds for changes to take effect.',
    },
    fields: {
      username: 'Username',
      interfaceColorMode: 'Interface color mode',
      clockType: 'Clock type',
      sendOnCtrlEnter: 'Send on CTRL + Enter',
      language: 'Language'
    },
    enumerators: {
      interfaceColorMode: {
        light: 'Light',
        dark: 'Dark'
      },
      clockType: {
        '12h': '12 Hours',
        '24h': '24 Hours'
      },
      language: {
        en: 'English',
        hu: 'Hungarian',
      },
      sendOnCtrlEnter: {
        on: 'On',
        off: 'Off',
      },
    }
  },

};

export default en;
