import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';

import { MongooseModule } from '@nestjs/mongoose'
import { diskStorage } from 'multer';
import { MongoModule } from 'src/common/mongo.module';


import { ShopSocials ,ShopSocialsSchema,
  Location,LocationSchema,
  DeliveryTime,DeliveryTimeSchema,
  SeoSettings,SeoSettingsSchema,
  GoogleSettings,GoogleSettingsSchema,
  FacebookSettings,FacebookSettingsSchema,
  ContactDetails,ContactDetailsSchema,
  SettingsOptions,SettingsOptionsSchema,
  Setting,SettingSchema

} from './entities/setting.entity';
import { Attachment, AttachmentSchema } from 'src/common/entities/attachment.entity';
import { MulterModule } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';
 
@Module({
  imports: [
  MongoModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
 
