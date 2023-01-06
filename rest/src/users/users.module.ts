import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ProfilesController, UsersController } from './users.controller';

import { MongoModule } from 'src/common/mongo.module';

@Module({
  imports: [
    MongoModule],
  controllers: [UsersController, ProfilesController],
  providers: [UsersService],
})
export class UsersModule {}
