import { IsEnum, IsOptional } from 'class-validator';
import { TransactionType } from 'src/repositories/transaction.entity';

export class QueryTransactionDto {
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;
}
