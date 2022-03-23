FROM alpine:3.14.4

RUN apk add --update nodejs npm && npm install --global yarn

COPY . . 

RUN yarn install

CMD ["node","src/main.js"]