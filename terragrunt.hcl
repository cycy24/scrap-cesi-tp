remote_state {
  backend = "s3"
  config = {
    bucket = "cesi-devops-state"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "cesi-devops-state-lock"
  }
}
