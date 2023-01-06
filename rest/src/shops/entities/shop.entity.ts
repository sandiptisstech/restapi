import { UserAddress } from 'src/addresses/entities/address.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Location, ShopSocials } from 'src/settings/entities/setting.entity';
import { User } from 'src/users/entities/user.entity';
import { Balance } from './balance.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, } from 'mongoose';
import * as mongoose from 'mongoose';


export type PaymentInfoDocument = HydratedDocument<PaymentInfo>;

@Schema()
export class PaymentInfo {
  @Prop()
  account: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  bank: string;
}
export const PaymentInfoSchema = SchemaFactory.createForClass(PaymentInfo);



 

export type ShopSettingsDocument = HydratedDocument<ShopSettings>;
export class ShopSettings {

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShopSocials' }] })
  socials: ShopSocials[];
  @Prop()
  contact: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location' })
  location: Location;
  @Prop()
  website: string;
}
export const ShopSettingsSchema = SchemaFactory.createForClass(ShopSettings);

export type ShopDocument = HydratedDocument<Shop>;

@Schema()
export class Shop extends CoreEntity {
  @Prop()
  owner_id: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  staffs?: User[];
  @Prop()
  is_active: boolean;
  @Prop()
  orders_count: number;
  @Prop()
  products_count: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Balance' })
  balance?: Balance;
  @Prop()
  name: string;
  @Prop()
  slug: string;
  @Prop()
  description?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  cover_image: Attachment;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  logo?: Attachment;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' })
  address: UserAddress;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ShopSettings' })
  settings?: ShopSettings;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);


