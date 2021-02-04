FROM buildkite/puppeteer

RUN adduser --disabled-password --gecos "" cesi
#RUN apk add --update nodejs npm && npm install --global yarn
USER cesi
COPY . . 

RUN yarn install --frozen-lockfile

CMD ["node","src/main.js"]