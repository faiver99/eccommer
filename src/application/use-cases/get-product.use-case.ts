// src/application/use-cases/get-product.use-case.ts
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string) {
    return this.productRepository.findById(id);
  }
}