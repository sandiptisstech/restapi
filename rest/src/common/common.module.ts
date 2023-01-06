import { Global, Module } from '@nestjs/common';

import { MongoModule } from './mongo.module';
import { ConfigModule } from './config.module';

@Global()
@Module({
  controllers: [],
  providers: [],
  imports: [ConfigModule,  MongoModule],
  exports: [ConfigModule,  MongoModule],
})
export class CommonModule {}
