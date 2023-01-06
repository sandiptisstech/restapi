import { CoreEntity } from 'src/common/entities/core.entity';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, } from 'mongoose';
import * as mongoose from 'mongoose';

export type AttachmentDocument = HydratedDocument<Attachment>;

@Schema()
export class Attachment extends CoreEntity {

  _id: mongoose.Types.ObjectId;

  @Prop()
  thumbnail?: string;

  @Prop()
  original?: string;

  video?:string;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
