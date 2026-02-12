import { ConsoleLogger, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QueryTransactionsService } from './query-transactions.service';

@Module({
  imports: [PrismaModule],
  providers: [QueryTransactionsService, ConsoleLogger],
  exports: [QueryTransactionsService],
})
export class QueryTransactionsModule {}
