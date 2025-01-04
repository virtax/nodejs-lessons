import { DataSource } from "typeorm";
import { User } from "../models/User";
import config from "config";

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    url: config.get("database.url"),
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})
