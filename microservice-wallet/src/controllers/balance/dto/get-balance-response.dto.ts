import { BalanceEntity } from 'src/repositories/transaction.entity';

export class GetBalanceResponseDto {
  constructor(payload: BalanceEntity) {
    this.amount = payload.balance;
  }
  amount!: number;
}
