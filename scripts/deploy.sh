ssh -i key.pem -o StrictHostKeyChecking=no ec2-user@$AWS_INSTANCE_ADDR docker-compose -f "$1" up --build -d --always-recreate
