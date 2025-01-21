import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Sale } from './entities/sale.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SALES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Sale),
    inject: ['DATA_SOURCE'],
  },
];
