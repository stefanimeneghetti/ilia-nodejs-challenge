import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BalanceEntity,
  TransactionEntity,
  TransactionType,
} from './transaction.entity';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    transactionData: Omit<TransactionEntity, 'id'>,
  ): Promise<TransactionEntity> {
    return this.prisma.transaction.create({
      data: transactionData,
    });
  }

  public async listTransactions(
    type?: TransactionType,
  ): Promise<TransactionEntity[]> {
    return this.prisma.transaction.findMany({
      where: type ? { type } : undefined,
    });
  }

  public async getTransactionBalance(): Promise<BalanceEntity> {
    const result = await this.prisma.$queryRaw<{ balance: number }[]>`
          SELECT
          SUM(CASE
              WHEN type = ${TransactionType.CREDIT}::"TransactionType" THEN amount
              WHEN type = ${TransactionType.DEBIT}::"TransactionType" THEN -amount
              ELSE 0
          END)::int as balance
          FROM "Transaction"
      `;

    return result[0];
  }
}
