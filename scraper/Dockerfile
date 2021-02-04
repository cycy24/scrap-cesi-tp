FROM buildkite/puppeteer

WORKDIR /scraping

RUN adduser --disabled-password --gecos "" cesi
#RUN apk add --update nodejs npm && npm install --global yarn

COPY . . 

USER root

RUN yarn install --frozen-lockfile && \
    chown -R cesi:cesi /scraping

USER cesi
CMD ["node","src/main.js"]