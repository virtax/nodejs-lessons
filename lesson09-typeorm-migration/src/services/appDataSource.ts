import { DataSource } from "typeorm";
// import config from "config";

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    url: process.env['DATABASE_URL'],
    //url: config.get("database.url"),
    synchronize: false,
    logging: true,
    entities: ['./src/models/*.ts'],
    subscribers: [],
    migrations: ['./src/migrations/*.ts'],
})
