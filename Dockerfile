FROM node:20-alpine

USER root

RUN mkdir /home/node/app

WORKDIR /home/node/app

EXPOSE 5173

CMD /bin/sh
