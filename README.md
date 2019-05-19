<h1 align="center"><strong>Boilerplate for GraphQL with Prisma API Server</strong></h1>
<br />

<div align="center"><strong>🚀 Bootstrap your GraphQL+Prisma API server to get you started immediately!</strong></div>



## Requirements

Node - https://nodejs.org/en/download/ <br/>
Docker<br/>
 └── Docker for Mac - https://docs.docker.com/docker-for-mac/install/ <br/>
 └── Docker for Windows - https://docs.docker.com/docker-for-windows/install/ <br/>
Prisma CLI - https://www.prisma.io/
```sh
brew install prisma
```

## Getting started
```sh
## Clone this repo
git clone https://github.com/leizleho/graphql-prisma-boilerplate.git

## cd into cloned report
cd graphql-prisma-boilerplate

## Install all dependencies of the project
yarn
```

## Add config files for environment variables
```sh
# current directory: graphql-prisma-boilerplate
mkdir .env
touch .env/dev
```
add this configuration in .env/dev file:
```
PRISMA_ENDPOINT=http://localhost:4466
PRISMA_SECRET=your_prisma_secret
JWT_SECRET=your_jsonwebtoken_secret
```

## Add docker compose file inside prisma folder
```sh
# current directory: graphql-prisma-boilerplate
cd prisma
touch docker-compose.yml
```

## Paste the following code in docker compose file and update database settings
```sh
version: '3'
services:
  prisma:
    image: prismagraphql/prisma:1.32.0
    restart: always
    ports:
      - '4466:4466'
    environment:
      PRISMA_CONFIG: |
        port: 4466
        databases:
          default:
            connector: postgres
            host: [YOUR POSTGRES HOST]
            database: [DATABASE]
            user: [USER]
            password: [PASSWORD]
            ssl: true
            port: [PORT]
            migrations: true
```

## Run the following command
```sh
# current directory: prisma
docker-compose up -d
prisma deploy -e ../.env/dev
```

## To generate token to play around with prisma admin page
```sh
prisma token -e ../.env/dev
```

## Start GraphQL Server on http://localhost:4000
```sh
# current directory: graphql-prisma-boilerplate
yarn start
```
