import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { GetBalanceModule } from './services/get-balance/get-balance.module';

@Module({
  imports: [GetBalanceModule],
  controllers: [BalanceController],
})
export class BalanceModule {}
