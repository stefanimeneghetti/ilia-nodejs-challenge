import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionService } from './create-transaction.service';
import { TransactionRepository } from 'src/repositories/transaction.repository';
import { ConsoleLogger, InternalServerErrorException } from '@nestjs/common';
import { CreateTransactionDto } from '../../dto/create-transaction.dto';
import { TransactionResponseDto } from '../../dto/transaction-response.dto';
import { TransactionType } from 'src/repositories/transaction.entity';

describe('CreateTransactionService', () => {
  let service: CreateTransactionService;

  const mockTransactionRepository = {
    create: jest.fn(),
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
          provide: TransactionRepository,
          useValue: mockTransactionRepository,
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
      mockTransactionRepository.create.mockResolvedValue(
        mockTransactionResponse,
      );

      const result = await service.execute(mockCreateTransactionDto);

      expect(mockLogger.setContext).toHaveBeenCalledWith(
        CreateTransactionService.name,
      );
      expect(mockLogger.log).toHaveBeenCalledWith('Started execution');
      expect(mockLogger.log).toHaveBeenCalledWith('Created transaction');

      expect(mockTransactionRepository.create).toHaveBeenCalledWith(
        mockCreateTransactionDto,
      );
      expect(mockTransactionRepository.create).toHaveBeenCalledTimes(1);

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

      mockTransactionRepository.create.mockResolvedValue(debitResponse);

      const result = await service.execute(debitDto);

      expect(mockTransactionRepository.create).toHaveBeenCalledWith(debitDto);
      expect(result).toEqual(debitResponse);
      expect(result.type).toBe(TransactionType.DEBIT);
    });

    it('should throw InternalServerErrorException when create transaction fails', async () => {
      const dbError = new Error('Database connection failed');
      mockTransactionRepository.create.mockRejectedValue(dbError);

      await expect(service.execute(mockCreateTransactionDto)).rejects.toThrow(
        InternalServerErrorException,
      );

      await expect(service.execute(mockCreateTransactionDto)).rejects.toThrow(
        'Unable to create transaction',
      );

      expect(mockTransactionRepository.create).toHaveBeenCalledWith(
        mockCreateTransactionDto,
      );
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Failed to create transaction',
        dbError,
      );
      expect(mockLogger.log).not.toHaveBeenCalledWith('Created transaction');
    });

    it('should handle non-Error objects in catch block', async () => {
      const nonErrorObject = 'String error message';
      mockTransactionRepository.create.mockRejectedValue(nonErrorObject);

      await expect(service.execute(mockCreateTransactionDto)).rejects.toThrow(
        InternalServerErrorException,
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Failed to create transaction',
        nonErrorObject,
      );
    });
  });
});
