if [ -d "/home/ec2-user/scrap-cesi-tp" ]; then
    cd /home/ec2-user/scrap-cesi-tp
    docker-compose -f "$1" kill
    cd .. && rm -rf ./scraper-bot
fi
