import {
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from '../../dto/create-transaction.dto';
import { TransactionResponseDto } from '../../dto/transaction-response.dto';

@Injectable()
export class CreateTransactionService {
  constructor(
    private readonly logger: ConsoleLogger,
    private readonly prisma: PrismaService,
  ) {}

  public async execute(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    this.logger.setContext(CreateTransactionService.name);
    this.logger.log('Started execution');

    try {
      const newTransaction = await this.prisma.transaction.create({
        data: createTransactionDto,
        select: {
          id: true,
          user_id: true,
          amount: true,
          type: true,
        },
      });

      this.logger.log('Created transaction');

      return newTransaction;
    } catch (error) {
      this.logger.error('Failed to create transaction', error);

      throw new InternalServerErrorException('Unable to create transaction');
    }
  }
}
