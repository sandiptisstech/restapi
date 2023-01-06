import { Module} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController, TopAuthors } from './authors.controller';
import { MongoModule } from 'src/common/mongo.module';

@Module({
  imports:[MongoModule],
  controllers: [AuthorsController, TopAuthors],
  providers: [AuthorsService],
})
export class AuthorsModule {}
