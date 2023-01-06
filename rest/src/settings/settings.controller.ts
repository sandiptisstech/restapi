import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ContactDetails, DeliveryTime, SeoSettings, SettingsOptions, ShopSocials,Location } from './entities/setting.entity';
import { Social } from 'src/users/entities/profile.entity';
import { Attachment } from 'src/common/entities/attachment.entity';
import { Types } from "mongoose";
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  //  private mongoObjectId() {
  //   var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  //   return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
  //       return (Math.random() * 16 | 0).toString(16);
  //   }).toLowerCase();
  //  };  
 

  @Post()
  async create(@Body() createSettingDto: CreateSettingDto) {

     
    return createSettingDto;
  }

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }
}
