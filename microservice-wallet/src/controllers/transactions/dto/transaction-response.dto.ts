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

  static fromArray(payloads: TransactionEntity[]): TransactionResponseDto[] {
    return payloads.map((payload) => new TransactionResponseDto(payload));
  }

  id!: string;
  user_id!: string;
  type!: TransactionType;
  amount!: number;
}
