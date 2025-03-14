// src/application/use-cases/create-product.use-case.ts
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(name: string, price: number, stock: number): Promise<Product> {
    const product = new Product(
      Math.random().toString(36).substring(7), // Generar un ID único
      name,
      price,
      stock,
    );
    await this.productRepository.save(product);
    return product;
  }
}