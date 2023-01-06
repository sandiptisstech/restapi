import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ProductsController,
  PopularProductsController,
} from './products.controller';

import { MongoModule } from 'src/common/mongo.module';

@Module({
  imports:[MongoModule],
  controllers: [ProductsController, PopularProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
