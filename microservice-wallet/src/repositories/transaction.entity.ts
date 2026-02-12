import { TransactionType } from '@prisma/client';

export { TransactionType };

export interface TransactionEntity {
  id: number;
  user_id: string;
  amount: number;
  type: TransactionType;
}

export interface BalanceEntity {
  balance: number;
}
