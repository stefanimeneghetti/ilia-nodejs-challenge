import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './controllers/transactions/transactions.module';
import { BalanceModule } from './controllers/balance/balance.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    RepositoriesModule,
    TransactionsModule,
    BalanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
