FROM node:12-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY shoploc-pa/package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

COPY shoploc-pa/. /app

EXPOSE 4200:4200

CMD ng serve --prod --host 0.0.0.0
