FROM node:boron
MAINTAINER Bruno Santos <brunosaantos00@gmail.com>

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json $HOME/api/

RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/api
RUN npm cache clean && npm install --silent --progress=false

USER root
COPY . $HOME/api
RUN chown -R app:app $HOME/*

USER app

CMD ["npm", "start"]
