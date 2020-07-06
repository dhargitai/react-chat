# React Chat

## A simple chat application written in Node.js and React with Typescript mostly with functional components. Supports dark mode. ;)

- **Bundling**: Parcel [https://parceljs.org/getting_started.html]
- **Design framework**: Material UI [https://material-ui.com/]
- **Chat solution**: Socket.io [https://socket.io/]
- **Supported languages (i18n)**: English, Hungarian
- **State management**: Context API [https://reactjs.org/docs/context.html]
- **Backend framework**: Express [https://expressjs.com/]
- **Form management**: Formik [https://jaredpalmer.com/formik]

## Demo
[https://simply-react-chat.herokuapp.com/]

## Setup

### Install dependencies

#### Option 1: with Docker

`docker-compose up -d`

#### Option 2: without Docker

Install dependencies both for server and client:

`npm install`

`cd client && npm install && cd ..`

Then you can start the development server with:

`npm run dev`

### Access the app

Now you should be able to open the app at:

`http://localhost:5000`


## How it works

The client code is bundled with Parcel and its artifacts are served from the `client/dist/` folder by the server.

The server initiates a websocket that the client can use to connect to it for the real-time connection.

The app consists of two pages: Home and Settings

On the Home page you can see the messages container and the message input field.
When you send a message, it is sent to the server through the socket and then the server spreads the message to all connected users (including you).

The application listens to this message broadcast and when a message arrives, it refreshes the message container and appends the new message after the existing ones.

On the Settings page you can set:
- a desired username which will be displayed above your messages at other users
- clock display mode: 12H or 24H
- user interface color mode: light or dark
- the language
- whether Ctrl+Enter combo or simply Enter is used to send the message

Features and todos:
- [x] Message box with right/left aligned message bubbles
- [x] Display username and time
- [x] Tab blinking on new messages if not on Home page
- [x] Showing new message counter on Home page menu label if not on Home page
- [x] Ability to change username
- [x] Ability to change interface color mode
- [x] Ability to change clock display mode
- [x] Ability to change key combo to send message
- [x] Internationalization
- [x] Sample test
- [ ] Support to unread chat notifications
- [ ] Link parser for displaying links as anchors and embed YT videos
