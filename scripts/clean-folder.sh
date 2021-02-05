if [ -d "/home/scraper-bot" ]; then
    cd /home/ec2-user/scraper-bot 
    docker-compose kill
    cd .. && rm -rf ./scraper-bot 
fi
