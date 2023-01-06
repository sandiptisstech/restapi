import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import {
  ApproveShopController,
  DisapproveShopController,
  ShopsController,
  StaffsController,
} from './shops.controller';
 
import { PaymentInfo, PaymentInfoSchema, 
  Shop,ShopSchema,
  ShopSettings,ShopSettingsSchema,

         } from './entities/shop.entity';
import { Balance,BalanceSchema } from './entities/balance.entity';

import { MongooseModule } from '@nestjs/mongoose'
 
@Module({
  imports: [MongooseModule.forFeature([
    {name: Shop.name, schema: ShopSchema },
    {name:PaymentInfo.name,schema:PaymentInfoSchema },
    {name:Balance.name,schema:BalanceSchema},
    {name:ShopSettings.name,schema:ShopSettingsSchema}
  
  ])],
  controllers: [
    ShopsController,
    StaffsController,
    DisapproveShopController,
    ApproveShopController,
  ],
  providers: [ShopsService],
})
export class ShopsModule {}
