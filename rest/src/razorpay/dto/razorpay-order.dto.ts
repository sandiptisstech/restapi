import { OmitType } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';

export class CreateOrderDto extends OmitType(Order, [
 
]) {}
