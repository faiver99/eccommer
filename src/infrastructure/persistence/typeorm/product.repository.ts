// src/infrastructure/persistence/typeorm/product.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/entities/product.entity';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly ormRepository: Repository<ProductEntity>,
  ) {}

  async save(product: Product): Promise<void> {
    const productEntity = this.toEntity(product);
    await this.ormRepository.save(productEntity);
  }

  async findById(id: string): Promise<Product | null> {
    const productEntity = await this.ormRepository.findOne({ where: { id } });
    return productEntity ? this.toDomain(productEntity) : null;
  }

  async findAll(): Promise<Product[]> {
    const productEntities = await this.ormRepository.find();
    return productEntities.map((entity) => this.toDomain(entity));
  }

  private toDomain(entity: ProductEntity): Product {
    return new Product(entity.id, entity.name, entity.price, entity.stock);
  }

  private toEntity(product: Product): ProductEntity {
    const entity = new ProductEntity();
    entity.id = product.id;
    entity.name = product.name;
    entity.price = product.price;
    entity.stock = product.stock;
    return entity;
  }
}