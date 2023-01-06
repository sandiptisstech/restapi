import { UserAddress } from 'src/addresses/entities/address.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { PaymentInfo,Shop } from 'src/shops/entities/shop.entity';
 

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, } from 'mongoose';
import * as mongoose from 'mongoose';

 

export type BalanceDocument = HydratedDocument<Balance>;

@Schema()
export class Balance {
  @Prop()
  id: number;
  @Prop()
  admin_commission_rate: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop?: Shop;
  @Prop()
  total_earnings: number;
  @Prop()
  withdrawn_amount: number;
  @Prop()
  current_balance: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentInfo' })
  payment_info: PaymentInfo;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
 
