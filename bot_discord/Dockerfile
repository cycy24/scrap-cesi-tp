FROM alpine:3.13.10

RUN apk add --update nodejs npm && npm install --global yarn

COPY . . 

RUN yarn install

CMD ["node","src/main.js"]