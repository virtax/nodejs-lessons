# Проект з прикладом express сервера з MongoDB та mongoose

## Опис файлів:
/config
* custom-environment-variables.yml - mapping of ENV variables to config properties
* default.json - default config for any environments
* default.ts - dynamic ts config
* dev.json - config for dev environment, used when NODE_ENV=dev
* test.json - config for test environment, used when NODE_ENV=test

/src

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

## How to start:
  copy ".env.example" to ".env"
  fill in .env value for DATABASE_URL="mongodb+srv://..."

```
npm install
npm run start:dev
```
open http://localhost:3000/

open http://localhost:3000/api/v1/users - users CRUD API
