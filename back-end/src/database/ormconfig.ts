import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv'
import * as path from 'path'



const environment = process.env.NODE_ENV || 'development'
const envFile = path.resolve(__dirname, `../../${environment}.env`);
dotenv.config({ path: envFile })


if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    throw new Error(`As variáveis de ambiente para o ambiente ${environment} não estão configuradas corretamente.`);
}

const isProduction = environment === 'production'

const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || undefined,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: isProduction ? [path.join(__dirname, '../**/entities/*.js')] :
        [path.join(__dirname, '../**/entities/*.entity.{ts,js}')],
    migrations: [
        path.join(__dirname, '../../dist/database/migrations/*.js')
    ],
    migrationsRun: isProduction,
    logging: environment === 'development',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
}

export const AppDataSource = new DataSource(config)