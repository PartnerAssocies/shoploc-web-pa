FROM node:12.2.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY shoploc-pa/package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

COPY shoploc-pa/. /app

CMD ng serve --prod --host 0.0.0.0
