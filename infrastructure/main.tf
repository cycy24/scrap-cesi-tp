terraform {
  backend "s3" {}
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

data "aws_ami" "amazon-linux-2" {
  most_recent = true

  owners = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-ebs"]
  }
}

resource "aws_instance" "main" {
  ami = data.aws_ami.amazon-linux-2.id
  instance_type = "t3a.medium"
  tags = {
    Name = "CESI Devops"
  }
  key_name = "cesi_devops"
  security_groups = [aws_security_group.main.name]
}

resource "aws_security_group" "main" {
  name = "cesi_devops"
  ingress {
    from_port = 22
    protocol = "TCP"
    to_port = 22
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    protocol = "TCP"
    to_port = 65535
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    protocol = "UDP"
    to_port = 65535
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "instance_ip" {
  value = aws_instance.main.public_ip
}
