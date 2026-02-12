import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionRepository } from './transaction.repository';
// ... outros repositories

@Global() // Torna global para não precisar importar em todo lugar
@Module({
  imports: [PrismaModule],
  providers: [TransactionRepository],
  exports: [TransactionRepository],
})
export class RepositoriesModule {}
