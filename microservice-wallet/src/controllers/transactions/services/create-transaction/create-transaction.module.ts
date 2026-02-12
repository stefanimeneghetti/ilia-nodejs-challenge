import { ConsoleLogger, Module } from '@nestjs/common';
import { CreateTransactionService } from './create-transaction.service';

@Module({
  providers: [CreateTransactionService, ConsoleLogger],
  exports: [CreateTransactionService],
})
export class CreateTransactionModule {}
