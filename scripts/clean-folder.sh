if [ -d "/home/ec2-user/scrap-cesi-tp" ]; then
    cd /home/ec2-user/scrap-cesi-tp
    docker-compose -f "$DOCKER_COMPOSE_YML_PATH" kill
    cd .. && rm -rf ./scraper-bot
fi
