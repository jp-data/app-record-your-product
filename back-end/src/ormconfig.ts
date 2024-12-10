import { DataSourceOptions } from "typeorm";

export const config: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'postgres',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    logging: ['query', 'error'],
}