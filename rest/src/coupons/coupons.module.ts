import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { MongoModule } from 'src/common/mongo.module';

@Module({
  imports:[MongoModule],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
