FROM debian:stretch

MAINTAINER Petr Messner

ENV DEBIAN_FRONTEND noninteractive
ENV NODE_ENV production

RUN apt-get update
RUN apt-get install -y build-essential curl apt-transport-https apt-utils

RUN echo "deb https://deb.nodesource.com/node_8.x stretch main" >> /etc/apt/sources.list.d/nodesource.list && \
    curl -sS https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -

RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" >> /etc/apt/sources.list.d/yarn.list && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -

RUN apt-get update
RUN apt-get install -y nodejs yarn

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install --production --no-progress

COPY . /app/
RUN yarn run build

RUN useradd --system --uid 900 --home-dir /app app
USER app

ENV BABEL_DISABLE_CACHE 1
ENV OVERWATCH_WEB_CONF /conf/overwatch-web.yaml

EXPOSE 3000

CMD ["node", "server"]
