import { ConsoleLogger, Module } from '@nestjs/common';
import { GetBalanceService } from './get-balance.service';
import { TransactionRepository } from 'src/repositories/transaction.repository';

@Module({
  providers: [GetBalanceService, ConsoleLogger, TransactionRepository],
  exports: [GetBalanceService],
})
export class GetBalanceModule {}
