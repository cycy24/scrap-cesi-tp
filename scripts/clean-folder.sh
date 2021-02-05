if [ -d "/home/scraper-bot" ]; then
    cd /home/scraper-bot 
    docker-compose kill
    cd .. && rm -rf ./scraper-bot 
fi