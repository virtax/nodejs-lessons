# Проект з прикладом контейнеризованого express сервера з MongoDB, mongoose та валідацією

## Опис файлів:
/config
* custom-environment-variables.yml - mapping of ENV variables to config properties
* default.json - default config for any environments
* default.ts - dynamic ts config
* dev.json - config for dev environment, used when NODE_ENV=dev
* test.json - config for test environment, used when NODE_ENV=test

/data - папка з базою Mongo, монтуется у контейнер mongodb

/src  - папка з текстом програми монтуется у контейнер node-server для hot reload
  /middleware
  * httpLogger - example of custom http logger
  /models
  * User.ts - mongoose model and schema for user
  /routes
  * userRouter.ts - router for CRUD for /api/v1/users
  /services
  * DatabaseService.ts - service for connect/disconnect to mongo db database using mongoose
  * UserService - CRUD service for users collection
  /utils
  * logger.ts - логгер
  * app.ts  - main express application file

Dockerfile and docker-compose.yml - файли для контейнерізації

## How to start:
  copy ".env.example" to ".env"

```
docker-compose up
```
open http://localhost:3000/

open http://localhost:3000/api/v1/users - users CRUD API
