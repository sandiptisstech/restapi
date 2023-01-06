import { Module } from '@nestjs/common';
import { RazorpayOrderService } from './razorpay-order.service';
import { RazorpayOrderController } from './razorpay-order.controller';
import { MongoModule } from 'src/common/mongo.module';

@Module({
  imports:[MongoModule],
  controllers: [RazorpayOrderController],
  providers: [RazorpayOrderService],
})
export class RazorpayOrderModule {}
