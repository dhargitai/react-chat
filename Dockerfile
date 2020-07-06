FROM node:10
WORKDIR /app
COPY . /app
RUN npm install
RUN cd client && npm install && npm run build && rm -rf node_modules
CMD npm run server
