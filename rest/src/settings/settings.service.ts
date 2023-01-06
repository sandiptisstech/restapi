import { Injectable,Inject } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ContactDetails, ContactDetailsDocument, DeliveryTime, DeliveryTimeDocument, GoogleSettings, GoogleSettingsDocument, Location,LocationDocument, SeoSettings, SeoSettingsDocument, Setting, SettingDocument, SettingsOptions, SettingsOptionsDocument, ShopSocials, ShopSocialsDocument } from './entities/setting.entity';
import settingsJson from '@db/settings.json';

import { Model } from 'mongoose';
 
import { InjectModel } from '@nestjs/mongoose';
import { Attachment, AttachmentDocument } from 'src/common/entities/attachment.entity';
import { Schema } from 'inspector';
import { Db, ObjectID } from 'mongodb';

//const settings = plainToClass(Setting, settingsJson);

@Injectable()
export class SettingsService {
  private settings: any ;
 

  async init() {
    //const productsTemp = plainToClass(Product, productsJson);
   // const fuse = new Fuse(productsTemp, options);
    this.settings = await this.db.collection('settings').findOne();
    //this.fuse = new Fuse(this.settings, options);
    //console.log("Database===>"+JSON.stringify(this.settings ));


}
  constructor( 
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  
    ) { this.init();}
 


    async create(createSettingDto: CreateSettingDto) {
     


    return this.settings;
  }

  findAll() {
   this.init();
   // returnthis.settingModel.find();
    return this.settings;
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return this.settings;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
