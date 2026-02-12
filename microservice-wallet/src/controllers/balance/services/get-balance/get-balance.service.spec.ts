import { Test, TestingModule } from '@nestjs/testing';
import { GetBalanceService } from './get-balance.service';
import { TransactionRepository } from 'src/repositories/transaction.repository';
import { ConsoleLogger, InternalServerErrorException } from '@nestjs/common';
import { GetBalanceResponseDto } from '../../dto/get-balance-response.dto';

describe('GetBalanceService', () => {
  let service: GetBalanceService;

  const mockTransactionRepository = {
    getTransactionBalance: jest.fn(),
  };

  const mockLogger = {
    setContext: jest.fn(),
    log: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetBalanceService,
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

    service = module.get<GetBalanceService>(GetBalanceService);

    jest.clearAllMocks();
  });

  describe('execute', () => {
    const mockBalanceValue = { balance: 1500 };
    const mockBalanceResponse = new GetBalanceResponseDto(mockBalanceValue);

    it('should get balance successfully', async () => {
      mockTransactionRepository.getTransactionBalance.mockResolvedValue(
        mockBalanceValue,
      );

      const result = await service.execute();

      expect(mockLogger.setContext).toHaveBeenCalledWith(
        GetBalanceService.name,
      );
      expect(mockLogger.log).toHaveBeenCalledWith('Started execution');
      expect(mockLogger.log).toHaveBeenCalledWith(
        'Transaction balance calculated',
      );

      expect(
        mockTransactionRepository.getTransactionBalance,
      ).toHaveBeenCalled();
      expect(
        mockTransactionRepository.getTransactionBalance,
      ).toHaveBeenCalledTimes(1);

      expect(result).toEqual(mockBalanceResponse);
      expect(result.amount).toBe(mockBalanceValue.balance);
    });

    it('should get zero balance successfully', async () => {
      const zeroBalance = { balance: 0 };
      const zeroBalanceResponse = new GetBalanceResponseDto(zeroBalance);

      mockTransactionRepository.getTransactionBalance.mockResolvedValue(
        zeroBalance,
      );

      const result = await service.execute();

      expect(
        mockTransactionRepository.getTransactionBalance,
      ).toHaveBeenCalled();
      expect(result).toEqual(zeroBalanceResponse);
      expect(result.amount).toBe(0);
    });

    it('should get negative balance successfully', async () => {
      const negativeBalance = { balance: -500 };
      const negativeBalanceResponse = new GetBalanceResponseDto(
        negativeBalance,
      );

      mockTransactionRepository.getTransactionBalance.mockResolvedValue(
        negativeBalance,
      );

      const result = await service.execute();

      expect(
        mockTransactionRepository.getTransactionBalance,
      ).toHaveBeenCalled();
      expect(result).toEqual(negativeBalanceResponse);
      expect(result.amount).toBe(-500);
    });

    it('should throw InternalServerErrorException when get balance fails', async () => {
      const dbError = new Error('Database connection failed');
      mockTransactionRepository.getTransactionBalance.mockRejectedValue(
        dbError,
      );

      await expect(service.execute()).rejects.toThrow(
        InternalServerErrorException,
      );

      await expect(service.execute()).rejects.toThrow(
        'Failed to calculate transaction balance',
      );

      expect(
        mockTransactionRepository.getTransactionBalance,
      ).toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Failed to calculate transaction balance',
        dbError,
      );
      expect(mockLogger.log).not.toHaveBeenCalledWith(
        'Transaction balance calculated',
      );
    });

    it('should handle null response from repository', async () => {
      mockTransactionRepository.getTransactionBalance.mockResolvedValue({
        balance: null,
      });

      const result = await service.execute();

      expect(
        mockTransactionRepository.getTransactionBalance,
      ).toHaveBeenCalled();
      expect(result).toBeInstanceOf(GetBalanceResponseDto);
      expect(result.amount).toBeNull();
    });
  });
});
