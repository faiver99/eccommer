// src/interfaces/controllers/product.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { GetProductUseCase } from '../../application/use-cases/get-product.use-case';
import { CreateProductDto } from '../dtos/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
  ) {}

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    const { name, price, stock } = body;
    return this.createProductUseCase.execute(name, price, stock);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.getProductUseCase.execute(id);
  }
}