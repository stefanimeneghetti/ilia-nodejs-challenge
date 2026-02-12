import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionService } from './create-transaction.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConsoleLogger, InternalServerErrorException } from '@nestjs/common';
import { CreateTransactionDto } from '../../dto/create-transaction.dto';
import { TransactionResponseDto } from '../../dto/transaction-response.dto';
import { TransactionType } from '@prisma/client';

describe('CreateTransactionService', () => {
  let service: CreateTransactionService;

  const mockPrismaService = {
    transaction: {
      create: jest.fn(),
    },
  };

  const mockLogger = {
    setContext: jest.fn(),
    log: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ConsoleLogger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<CreateTransactionService>(CreateTransactionService);

    jest.clearAllMocks();
  });

  describe('execute', () => {
    const mockCreateTransactionDto: CreateTransactionDto = {
      user_id: 'user_1',
      amount: 100,
      type: TransactionType.CREDIT,
    };

    const mockTransactionResponse: TransactionResponseDto = {
      id: 1,
      user_id: 'user_1',
      amount: 100,
      type: TransactionType.CREDIT,
    };

    it('should create a transaction successfully', async () => {
      mockPrismaService.transaction.create.mockResolvedValue(
        mockTransactionResponse,
      );

      const result = await service.execute(mockCreateTransactionDto);

      expect(mockLogger.setContext).toHaveBeenCalledWith(
        CreateTransactionService.name,
      );
      expect(mockLogger.log).toHaveBeenCalledWith('Started execution');
      expect(mockLogger.log).toHaveBeenCalledWith('Created transaction');

      expect(mockPrismaService.transaction.create).toHaveBeenCalledWith({
        data: mockCreateTransactionDto,
        select: {
          id: true,
          user_id: true,
          amount: true,
          type: true,
        },
      });

      expect(result).toEqual(mockTransactionResponse);
    });

    it('should create a transaction with DEBIT type', async () => {
      const debitDto: CreateTransactionDto = {
        user_id: 'user_2',
        amount: 50,
        type: TransactionType.DEBIT,
      };

      const debitResponse: TransactionResponseDto = {
        id: 2,
        user_id: 'user_2',
        amount: 50,
        type: TransactionType.DEBIT,
      };

      mockPrismaService.transaction.create.mockResolvedValue(debitResponse);

      const result = await service.execute(debitDto);

      expect(result).toEqual(debitResponse);
      expect(result.type).toBe(TransactionType.DEBIT);
    });

    it('should throw InternalServerErrorException when create transaction fails', async () => {
      const dbError = new Error('Database connection failed');
      mockPrismaService.transaction.create.mockRejectedValue(dbError);

      await expect(service.execute(mockCreateTransactionDto)).rejects.toThrow(
        InternalServerErrorException,
      );

      await expect(service.execute(mockCreateTransactionDto)).rejects.toThrow(
        'Unable to create transaction',
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Failed to create transaction',
        dbError,
      );
      expect(mockLogger.log).not.toHaveBeenCalledWith('Created transaction');
    });
  });
});
