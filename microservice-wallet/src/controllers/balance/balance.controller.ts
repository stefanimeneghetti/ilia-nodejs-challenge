import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetBalanceService } from './services/get-balance/get-balance.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('balance')
@UseGuards(JwtAuthGuard)
export class BalanceController {
  constructor(private readonly getBalanceService: GetBalanceService) {}

  @Get()
  getBalance() {
    return this.getBalanceService.execute();
  }
}
