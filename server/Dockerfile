FROM node:16-alpine
WORKDIR /APP
COPY package.json .
#install dev dependences only in dev mode
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "dev" ]; \
        then npm install; \
        else npm install --only=production; \
        fi
COPY . ./
ENV PORT 4000
EXPOSE $PORT
CMD ["node", "server.js"]   
