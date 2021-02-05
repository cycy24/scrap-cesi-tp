scp -i key.pem -o StrictHostKeyChecking=no ../scraper-bot.tar.gzip ec2-user@$AWS_INSTANCE_ADDR:/home/ec2-user/scraper-bot.tar.gzip &&
ssh -i key.pem -o StrictHostKeyChecking=no ec2-user@$AWS_INSTANCE_ADDR tar -xzf /home/ec2-user/scraper-bot.tar.gzip
