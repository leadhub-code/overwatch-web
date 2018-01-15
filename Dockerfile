FROM node:carbon-alpine

ENV NODE_ENV=production

WORKDIR /overwatch-web
COPY package.json yarn.lock /overwatch-web/
RUN node --version && yarn install
# ^^^ display node version info just for debug purposes

COPY . /overwatch-web/
RUN yarn build

# modify sample configuration
RUN sed --in-place=.orig 's/127.0.0.1/172.17.0.1/g' sample_configuration.yaml && \
    ( diff -u sample_configuration.yaml.orig sample_configuration.yaml || true )

CMD ["yarn", "start"]

