import { OmitType } from '@nestjs/swagger';
import { Payment } from '../entities/payment.entity';

export class CreatePaymentDto extends OmitType(Payment, [
 
]) {}
