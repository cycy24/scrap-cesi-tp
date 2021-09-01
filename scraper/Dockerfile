FROM alpine:3.13

WORKDIR /scraping

RUN adduser --disabled-password --gecos "" cesi && apk add --update --no-cache bash \
    nodejs npm \ 
    alsa-lib \
    at-spi2-atk \
    atk \
    cairo \
    cups-libs \
    dbus-libs \
    eudev-libs \
    expat \
    flac \
    gdk-pixbuf \
    glib \
    libgcc \
    libjpeg-turbo \
    libpng \
    libwebp \
    libx11 \
    libxcomposite \
    libxdamage \
    libxext \
    libxfixes \
    tzdata \
    libexif \
    udev \
    xvfb \
    zlib-dev \
    chromium \
    chromium-chromedriver \
    && npm install --global yarn 


COPY . . 

USER root

RUN yarn install --frozen-lockfile && \
    chown -R cesi:cesi /scraping

USER cesi

CMD ["node","src/main.js"]