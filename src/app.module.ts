// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product.module';
import { ProductEntity } from './infrastructure/persistence/typeorm/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'ecommerce',
      entities: [ProductEntity],
      synchronize: true,
    }),
    ProductModule,
  ],
})
export class AppModule {}