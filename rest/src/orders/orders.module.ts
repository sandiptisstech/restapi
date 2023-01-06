import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';



import {
  DownloadInvoiceController,
  OrderExportController,
  OrderFilesController,
  OrdersController,
  OrderStatusController,
} from './orders.controller';

import { MongoModule } from 'src/common/mongo.module';

@Module({
  imports: [
    MongoModule],
  controllers: [
    OrdersController,
    OrderStatusController,
    OrderFilesController,
    OrderExportController,
    DownloadInvoiceController,
  ],
  providers: [OrdersService],
})
export class OrdersModule {}
