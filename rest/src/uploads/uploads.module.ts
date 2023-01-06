import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MulterModule.register({
    dest: './public',
  }),
  ConfigModule.forRoot({ isGlobal: true }),],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
