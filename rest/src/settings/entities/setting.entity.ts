import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, } from 'mongoose';
import * as mongoose from 'mongoose';

export type ShopSocialsDocument = HydratedDocument<ShopSocials>;
@Schema()
export class ShopSocials {
  _id: mongoose.Types.ObjectId;

  
  @Prop()
  icon: string;
  @Prop()
  url: string;
}
export const ShopSocialsSchema = SchemaFactory.createForClass(ShopSocials);


export type LocationDocument = HydratedDocument<Location>;
@Schema()
export class Location {
 
  _id: mongoose.Types.ObjectId;
  @Prop()
  lat: number;
  @Prop()
  lng: number;
  @Prop()
  city?: string;
  @Prop()
  state: string;
  @Prop()
  country: string;
  @Prop()
  zip?: string;
  @Prop()
  formattedAddress: string;
}
export const LocationSchema = SchemaFactory.createForClass(Location);





export type DeliveryTimeDocument = HydratedDocument<DeliveryTime>;
@Schema()
export class DeliveryTime {
  _id: mongoose.Types.ObjectId;


  @Prop()
  title: string;

  @Prop()
  description: string;
}
export const DeliveryTimeSchema = SchemaFactory.createForClass(DeliveryTime);


export type SeoSettingsDocument = HydratedDocument<SeoSettings>;
@Schema()
export class SeoSettings {

  _id: mongoose.Types.ObjectId;

  @Prop()
  metaTitle?: string;
  @Prop()
  metaDescription?: string;
  @Prop()
  ogTitle?: string;
  @Prop()
  ogDescription?: string;

  @Prop()
  ogImage?: Attachment;

  @Prop()
  twitterHandle?: string;

  @Prop()
  twitterCardType?: string;

  @Prop()
  metaTags?: string;

  @Prop()
  canonicalUrl?: string;
}
export const SeoSettingsSchema = SchemaFactory.createForClass(SeoSettings);


export type GoogleSettingsDocument = HydratedDocument<GoogleSettings>;
@Schema()
export class GoogleSettings {
  _id: mongoose.Types.ObjectId;


  @Prop()
  isEnable: boolean;

  @Prop()
  tagManagerId: string;
}
export const GoogleSettingsSchema = SchemaFactory.createForClass(GoogleSettings);


export type FacebookSettingsDocument = HydratedDocument<FacebookSettings>;
@Schema()
export class FacebookSettings {

  _id: mongoose.Types.ObjectId;


  @Prop()
  isEnable: boolean;

  @Prop()
  appId: string;

  @Prop()
  pageId: string;
}
export const FacebookSettingsSchema = SchemaFactory.createForClass(FacebookSettings);



export type ContactDetailsDocument = HydratedDocument<ContactDetails>;
@Schema()
export class ContactDetails {

  _id: mongoose.Types.ObjectId;


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShopSocials' }] })
  socials: ShopSocials[];

  @Prop()
  contact: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location' })
  location: Location;

  @Prop()
  website: string;
}
export const ContactDetailsSchema = SchemaFactory.createForClass(ContactDetails);





export type SettingsOptionsDocument = HydratedDocument<SettingsOptions>;

@Schema()
export class SettingsOptions   {
  _id: mongoose.Types.ObjectId;

  @Prop()
  siteTitle: string;
  @Prop()
  siteSubtitle: string;
  @Prop()
  currency: string;
  @Prop()
  minimumOrderAmount: number;
  @Prop()
  walletToCurrencyRatio: number;
  @Prop()
  signupPoints: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryTime' }] })
  deliveryTime: DeliveryTime[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  logo: Attachment;

  @Prop()
  taxClass: string;
  @Prop()
  shippingClass: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SeoSettings' })
  seo: SeoSettings;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'GoogleSettings' })
  google?: GoogleSettings;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'FacebookSettings' })
  facebook?: FacebookSettings;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ContactDetails' })
  contactDetails: ContactDetails;
  @Prop()
  maximumQuestionLimit: number;
}

export const SettingsOptionsSchema = SchemaFactory.createForClass(SettingsOptions);



export type SettingDocument = HydratedDocument<Setting>;
@Schema()
export class Setting extends CoreEntity {

  _id: mongoose.Types.ObjectId;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SettingsOptions' })
  options: SettingsOptions;

  @Prop()
  language: string;

  @Prop([String])
  translated_languages: string[];
}

export const SettingSchema = SchemaFactory.createForClass(Setting);

