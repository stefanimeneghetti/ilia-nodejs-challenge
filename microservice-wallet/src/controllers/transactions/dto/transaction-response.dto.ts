import { TransactionType } from '@prisma/client';

export class TransactionResponseDto {
  id!: number;
  user_id!: string;
  type!: TransactionType;
  amount!: number;
}
