ssh -i key.pem -o StrictHostKeyChecking=no ec2-user@$AWS_INSTANCE_ADDR docker-compose -f "$DOCKER_COMPOSE_YML_PATH" up --build -d --always-recreate
