import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CreateTransactionService } from './services/create-transaction/create-transaction.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { QueryTransactionDto } from './dto/query-transactions.dto';
import { QueryTransactionsService } from './services/query-transactions/query-transactions.service';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
    private readonly queryTransactionsService: QueryTransactionsService,
  ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.createTransactionService.execute(createTransactionDto);
  }

  @Get()
  findAll(@Query() queryParams: QueryTransactionDto) {
    return this.queryTransactionsService.execute(queryParams);
  }
}
