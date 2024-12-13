#Проект з прикладом простого express сервера

##Опис файлів:
/config
* custom-environment-variables.yml - mapping of ENV variables to config properties
* default.json - default config for any environments
* default.ts - dynamic ts config
* dev.json - config for dev environment, used when NODE_ENV=dev
* test.json - config for test environment, used when NODE_ENV=test

/src

  /middleware
  * httpLogger - example of custom http logger
  /routes
  * users.ts - router for simple in memory CRUD (without "UD") for /api/users
  /utils
  * logger.ts - логгер

* app.ts  - main express application file

##How to start:
  copy '.env.example' to '.env'

```
npm install
npm run start:dev
```
open http://localhost:3000/

open http://localhost:3000/api/users - users CRUD API (without 'UD')