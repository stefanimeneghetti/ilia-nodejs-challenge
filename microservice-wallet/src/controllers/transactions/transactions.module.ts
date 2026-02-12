import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { CreateTransactionModule } from './services/create-transaction/create-transaction.module';

@Module({
  imports: [CreateTransactionModule],
  controllers: [TransactionsController],
  providers: [],
})
export class TransactionsModule {}
