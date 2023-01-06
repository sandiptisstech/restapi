import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongoModule } from 'src/common/mongo.module';
import { ReportsService } from 'src/reports/reports.service';

@Module({
  imports: [
    MongoModule],
  controllers: [AuthController],
  providers: [AuthService,ReportsService],
})
export class AuthModule {}
