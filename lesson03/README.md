#Проект з прикладами EventEmitter, Streams, setImmediate, dynamic ts config

##Опис файлів:
/config
* custom-environment-variables.yml - mapping of ENV variables to config properties
* default.json - default config for any environments
* default.ts - dynamic ts config
* dev.json - config for dev environment, used when NODE_ENV=dev

/data
* text.txt - sample text file for streams example

/src
* evetntsEmitter.ts - приклад використання EventEmitter
* PackageVersionReader.ts - приклад планування запуска послідовного ланцюжка залежних задач за допомогою setImmediate()
* simplePackageReader.ts - приклад, як можно прочитати c статичний json файл з проекту
* streams.ts - приклад використання Streams (createReadStream, createWriteStream, pipe з gzip)
* utils/logger.ts - логгер
* main.ts  - main file, please comment not used functionality

##How to start:
  copy '.env.example' to '.env'

```
npm install
npm run start:dev
```