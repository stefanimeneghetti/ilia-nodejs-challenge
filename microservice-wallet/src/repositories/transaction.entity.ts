import { TransactionType } from '@prisma/client';

export { TransactionType };

export interface TransactionEntity {
  id: string;
  user_id: string;
  amount: number;
  type: TransactionType;
}

export interface BalanceEntity {
  balance: number;
}
