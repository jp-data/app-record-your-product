import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv'
import * as path from 'path'

const environment = process.env.NODE_ENV || 'development'
const envFile = path.resolve(__dirname, `../../src/database/${environment}.env`);
dotenv.config({ path: envFile })
// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_PORT:", process.env.DB_PORT);
// console.log("DB_USERNAME:", process.env.DB_USERNAME);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
// console.log("DB_NAME:", process.env.DB_NAME);

if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    throw new Error(`As variáveis de ambiente para o ambiente ${environment} não estão configuradas corretamente.`);
}

// console.log("Using environment:", process.env.NODE_ENV)

const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: environment === 'production' ? false : true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsRun: environment === 'production',
    logging: environment === 'development'
}

export const AppDataSource = new DataSource(config)