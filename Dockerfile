 FROM mhart/alpine-node:6

WORKDIR /
ADD index.js .
ADD package.json .

RUN npm install

EXPOSE 8080

CMD ["node", "index.js"]