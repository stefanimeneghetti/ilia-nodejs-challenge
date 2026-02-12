import {
  TransactionEntity,
  TransactionType,
} from 'src/repositories/transaction.entity';

export class TransactionResponseDto {
  constructor(payload: TransactionEntity) {
    this.id = payload.id;
    this.user_id = payload.user_id;
    this.type = payload.type;
    this.amount = payload.amount;
  }

  id!: number;
  user_id!: string;
  type!: TransactionType;
  amount!: number;
}
