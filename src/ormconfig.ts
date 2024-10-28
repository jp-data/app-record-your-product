import { DataSourceOptions } from "typeorm";

export const config: DataSourceOptions = {
    type: 'sqlite',
    database: 'C:/Users/ADMIN/Desktop/registerAppdb',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    logging: ['query', 'error'],
}