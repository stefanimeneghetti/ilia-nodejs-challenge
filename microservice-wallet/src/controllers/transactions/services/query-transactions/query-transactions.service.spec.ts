import { Test, TestingModule } from '@nestjs/testing';
import { QueryTransactionsService } from './query-transactions.service';
import { ConsoleLogger, InternalServerErrorException } from '@nestjs/common';
import { QueryTransactionDto } from '../../dto/query-transactions.dto';
import { TransactionResponseDto } from '../../dto/transaction-response.dto';
import { TransactionRepository } from 'src/repositories/transaction.repository';
import {
  TransactionEntity,
  TransactionType,
} from 'src/repositories/transaction.entity';

describe('QueryTransactionsService', () => {
  let service: QueryTransactionsService;

  const mockTransactionRepository = {
    listTransactions: jest.fn(),
  };

  const mockLogger = {
    setContext: jest.fn(),
    log: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryTransactionsService,
        {
          provide: TransactionRepository,
          useValue: mockTransactionRepository,
        },
        {
          provide: ConsoleLogger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<QueryTransactionsService>(QueryTransactionsService);

    jest.clearAllMocks();
  });

  describe('execute', () => {
    const mockQueryDto: QueryTransactionDto = {
      type: TransactionType.CREDIT,
    };

    const mockTransactions: TransactionEntity[] = [
      {
        id: 1,
        user_id: 'user_1',
        amount: 100,
        type: TransactionType.CREDIT,
      },
      {
        id: 2,
        user_id: 'user_2',
        amount: 200,
        type: TransactionType.CREDIT,
      },
      {
        id: 3,
        user_id: 'user_3',
        amount: 150,
        type: TransactionType.CREDIT,
      },
    ];

    it('should query transactions by type successfully', async () => {
      mockTransactionRepository.listTransactions.mockResolvedValue(
        mockTransactions,
      );

      const result = await service.execute(mockQueryDto);

      expect(mockLogger.log).toHaveBeenCalledWith(
        `Querying transactions with filter: ${JSON.stringify(mockQueryDto)}`,
      );
      expect(mockLogger.log).toHaveBeenCalledWith(
        `Found ${mockTransactions.length} transactions`,
      );

      expect(mockTransactionRepository.listTransactions).toHaveBeenCalledWith(
        mockQueryDto.type,
      );

      expect(result).toHaveLength(3);
      expect(result[0]).toBeInstanceOf(TransactionResponseDto);
      expect(result).toEqual(mockTransactions);
    });

    it('should query transactions with DEBIT type', async () => {
      const debitQueryDto: QueryTransactionDto = {
        type: TransactionType.DEBIT,
      };

      const debitTransactions: TransactionEntity[] = [
        {
          id: 4,
          user_id: 'user_4',
          amount: 75,
          type: TransactionType.DEBIT,
        },
        {
          id: 5,
          user_id: 'user_5',
          amount: 125,
          type: TransactionType.DEBIT,
        },
      ];

      mockTransactionRepository.listTransactions.mockResolvedValue(
        debitTransactions,
      );

      const result = await service.execute(debitQueryDto);

      expect(mockTransactionRepository.listTransactions).toHaveBeenCalledWith(
        TransactionType.DEBIT,
      );

      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(TransactionResponseDto);
      expect(result).toEqual(debitTransactions);
    });

    it('should query all transactions when no type filter is provided', async () => {
      const emptyQueryDto: QueryTransactionDto = {};

      const allTransactions: TransactionEntity[] = [
        {
          id: 1,
          user_id: 'user_1',
          amount: 100,
          type: TransactionType.CREDIT,
        },
        {
          id: 2,
          user_id: 'user_2',
          amount: 200,
          type: TransactionType.DEBIT,
        },
        {
          id: 3,
          user_id: 'user_3',
          amount: 150,
          type: TransactionType.CREDIT,
        },
      ];

      mockTransactionRepository.listTransactions.mockResolvedValue(
        allTransactions,
      );

      const result = await service.execute(emptyQueryDto);

      expect(mockTransactionRepository.listTransactions).toHaveBeenCalledWith(
        undefined,
      );

      expect(result).toHaveLength(3);
      expect(result).toEqual(allTransactions);
    });

    it('should return empty array when no transactions found', async () => {
      const emptyQueryDto: QueryTransactionDto = {
        type: TransactionType.CREDIT,
      };

      mockTransactionRepository.listTransactions.mockResolvedValue([]);

      const result = await service.execute(emptyQueryDto);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
      expect(mockLogger.log).toHaveBeenCalledWith('Found 0 transactions');
    });

    it('should throw InternalServerErrorException when query transactions fails', async () => {
      const dbError = new Error('Database connection failed');
      mockTransactionRepository.listTransactions.mockRejectedValue(dbError);

      await expect(service.execute(mockQueryDto)).rejects.toThrow(
        InternalServerErrorException,
      );

      await expect(service.execute(mockQueryDto)).rejects.toThrow(
        'Failed to fetch transactions',
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Failed to query transactions',
        dbError,
      );
    });
  });
});
