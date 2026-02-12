import {
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryTransactionDto } from '../../dto/query-transactions.dto';
import { TransactionResponseDto } from '../../dto/transaction-response.dto';
import { TransactionRepository } from 'src/repositories/transaction.repository';

@Injectable()
export class QueryTransactionsService {
  constructor(
    private readonly logger: ConsoleLogger,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(
    queryDto: QueryTransactionDto,
  ): Promise<TransactionResponseDto[]> {
    try {
      this.logger.log(
        `Querying transactions with filter: ${JSON.stringify(queryDto)}`,
      );

      const transactions = await this.transactionRepository.listTransactions(
        queryDto.type,
      );

      this.logger.log(`Found ${transactions.length} transactions`);

      return TransactionResponseDto.fromArray(transactions);
    } catch (error) {
      this.logger.error('Failed to query transactions', error);

      throw new InternalServerErrorException('Failed to fetch transactions');
    }
  }
}
