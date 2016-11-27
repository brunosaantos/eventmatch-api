FROM node:boron
MAINTAINER Bruno Santos <brunosaantos00@gmail.com>

RUN npm install -g yarn

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json $HOME/api/

RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/api
# RUN npm cache clean && npm install --production --silent --progress=false
RUN yarn install --pure-lockfile

USER root
COPY . $HOME/api
RUN chown -R app:app $HOME/*

USER app

CMD ["npm", "start"]
