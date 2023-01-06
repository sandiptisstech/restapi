import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient, Db } from 'mongodb';

@Module({
  imports: [
    MongooseModule.forRootAsync({
        
      useFactory: async (configService: ConfigService) => ({
        uri: "mongodb://ecom:ecom@localhost:27017",
        dbname:"ecommerc"
        
      }),
      inject: [ConfigService],
    }),


  ],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        try {
          const client = MongoClient.connect('mongodb://127.0.0.1:27017');
          return (await client).db('ecommerc');
        } catch (e) {
          console.log("EEEEEE=>"+JSON.stringify(e));
          throw e;
        }
      }
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class MongoModule {}