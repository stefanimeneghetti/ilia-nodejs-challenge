import { ConsoleLogger, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateTransactionService } from './create-transaction.service';

@Module({
  imports: [PrismaModule],
  providers: [CreateTransactionService, ConsoleLogger],
  exports: [CreateTransactionService],
})
export class CreateTransactionModule {}
