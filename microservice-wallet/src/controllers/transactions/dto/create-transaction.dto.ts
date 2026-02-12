import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { TransactionType } from 'src/repositories/transaction.entity';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  user_id!: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type!: TransactionType;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount!: number;
}
