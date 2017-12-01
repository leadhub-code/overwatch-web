FROM node:carbon

ENV NODE_ENV=production

WORKDIR /overwatch-web
COPY package.json yarn.lock /overwatch-web/
RUN yarn install

COPY . /overwatch-web/
RUN yarn build

CMD ["yarn", "start"]

