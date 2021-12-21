FROM node:16-alpine
WORKDIR /APP
COPY package.json .
#install dev dependences only in dev mode
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; \
        then npm install --only=production; \
        else npm install; \
        fi
COPY . ./
ENV PORT 4000
EXPOSE $PORT
CMD ["node", "server.js"]   
