import { Controller, Get } from '@nestjs/common';
import { GetBalanceService } from './services/get-balance/get-balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly getBalanceService: GetBalanceService) {}

  @Get()
  getBalance() {
    return this.getBalanceService.execute();
  }
}
