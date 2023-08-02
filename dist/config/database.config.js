"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
exports.databaseConfig = {
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: +((_a = process.env.DATABASE_PORT) !== null && _a !== void 0 ? _a : "5432"),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    // eslint-disable-next-line n/no-path-concat
    // entities: [__dirname + "/../**/*.entity{.js,.ts}"],
    synchronize: true,
};
