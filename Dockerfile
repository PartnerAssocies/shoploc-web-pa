FROM node:12-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_OPTIONS=--max_old_space_size=8192
COPY shoploc-pa/package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@latest

COPY shoploc-pa/. /app

EXPOSE 4200:4200

CMD ng serve --host 0.0.0.0
