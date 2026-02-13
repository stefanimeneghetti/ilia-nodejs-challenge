import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { TransactionType } from 'src/repositories/transaction.entity';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'O campo deve conter apenas letras, números e underscore',
  })
  user_id!: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type!: TransactionType;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount!: number;
}
