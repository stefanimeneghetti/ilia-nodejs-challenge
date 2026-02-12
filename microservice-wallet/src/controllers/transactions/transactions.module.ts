import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { CreateTransactionModule } from './services/create-transaction/create-transaction.module';
import { QueryTransactionsModule } from './services/query-transactions/query-transactions.module';

@Module({
  imports: [CreateTransactionModule, QueryTransactionsModule],
  controllers: [TransactionsController],
  providers: [],
})
export class TransactionsModule {}
