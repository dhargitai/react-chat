const hu = {
  common: {
    waitingForConnection: 'Várakozás kapcsolódásra...',
    loading: 'Betöltés...',
    newMessage: 'Új üzenet',
  },

  pages: {
    home: 'Chat',
    settings: 'Beállítások',
  },

  home: {
    sendOnCtrlEnter: 'Küldés: Ctrl + Enter',
    sendOnEnter: 'Küldés: Enter',
    yourMessage: 'Az üzeneted',
    sendMessage: 'Üzenet küldése',
  },

  settings: {
    title: 'Beállítások',
    resetToDefaults: 'Alapértékek visszaállítása',
    fields: {
      username: 'Felhasználónév',
      interfaceColorMode: 'Felület színösszeállítása',
      clockType: 'Óra típusa',
      sendOnCtrlEnter: 'CTRL + Enterrel elküldi az üzenetet',
      language: 'Nyelv'
    },
    enumerators: {
      interfaceColorMode: {
        light: 'Világos',
        dark: 'Sötét'
      },
      clockType: {
        '12h': '12 Órás',
        '24h': '24 Órás'
      },
      language: {
        en: 'Angol',
        hu: 'Magyar',
      },
      sendOnCtrlEnter: {
        on: 'Be',
        off: 'Ki',
      },
    }
  },

};

export default hu;
