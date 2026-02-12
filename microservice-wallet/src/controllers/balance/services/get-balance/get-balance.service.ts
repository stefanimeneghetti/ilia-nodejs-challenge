import {
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GetBalanceResponseDto } from '../../dto/get-balance-response.dto';
import { TransactionRepository } from 'src/repositories/transaction.repository';

@Injectable()
export class GetBalanceService {
  constructor(
    private readonly logger: ConsoleLogger,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(): Promise<GetBalanceResponseDto> {
    this.logger.setContext(GetBalanceService.name);
    this.logger.log('Started execution');

    try {
      const balance = await this.transactionRepository.getTransactionBalance();

      this.logger.log('Transaction balance calculated');

      return new GetBalanceResponseDto(balance);
    } catch (error) {
      this.logger.error('Failed to calculate transaction balance', error);

      throw new InternalServerErrorException(
        'Failed to calculate transaction balance',
      );
    }
  }
}
