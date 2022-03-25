FROM alpine:3.13.8

RUN apk add --update nodejs npm && npm install --global yarn

COPY . . 

RUN yarn install

CMD ["node","src/main.js"]