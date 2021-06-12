## Stage 1 (base)
FROM node:14.15.1 as base

RUN adduser node root

RUN apt-get update && apt-get install -y sudo

# ENV DOCKERIZE_VERSION v0.2.0
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \  
#     && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=development
RUN npm install -g @nestjs/cli

RUN npm install && npm cache clean --force

# COPY ./docker-entrypoint.sh .

# RUN sudo chmod +x docker-entrypoint.sh  
# ENTRYPOINT ./docker-entrypoint.sh

EXPOSE 3333

