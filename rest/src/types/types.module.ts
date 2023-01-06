import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { MongoModule } from 'src/common/mongo.module';

@Module({
  imports:[MongoModule],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
