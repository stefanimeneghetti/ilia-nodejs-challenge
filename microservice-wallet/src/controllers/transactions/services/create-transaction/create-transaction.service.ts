import {
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTransactionDto } from '../../dto/create-transaction.dto';
import { TransactionResponseDto } from '../../dto/transaction-response.dto';
import { TransactionRepository } from 'src/repositories/transaction.repository';

@Injectable()
export class CreateTransactionService {
  constructor(
    private readonly logger: ConsoleLogger,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    this.logger.setContext(CreateTransactionService.name);
    this.logger.log('Started execution');

    try {
      const newTransaction =
        await this.transactionRepository.create(createTransactionDto);

      this.logger.log('Created transaction');

      return new TransactionResponseDto(newTransaction);
    } catch (error) {
      this.logger.error('Failed to create transaction', error);

      throw new InternalServerErrorException('Unable to create transaction');
    }
  }
}
