import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionRepository } from './transaction.repository';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [TransactionRepository],
  exports: [TransactionRepository],
})
export class RepositoriesModule {}
