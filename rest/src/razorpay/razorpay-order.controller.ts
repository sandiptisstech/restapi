import {
  Controller,
 
  Post,
  Body,
 
} from '@nestjs/common';
import { RazorpayOrderService } from './razorpay-order.service';
import { CreateOrderDto } from './dto/razorpay-order.dto';
import { CreatePaymentDto } from './dto/razorpay-payment.dto';
 

@Controller('razorpayorder')
export class RazorpayOrderController {
  constructor(private readonly razorpayOrderService: RazorpayOrderService) {}

  @Post('createorder')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.razorpayOrderService.create(createOrderDto);
  }

  @Post('paymentinfo')
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.razorpayOrderService.createPayments(createPaymentDto);
  }

  
}
