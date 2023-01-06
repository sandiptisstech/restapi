import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';

import typesJson from '@db/types.json';
import Fuse from 'fuse.js';
import { GetTypesDto } from './dto/get-types.dto';
import { Db, ObjectID } from 'mongodb';

//const types = plainToClass(Type, typesJson);
const options = {
  keys: ['name'],
  threshold: 0.3,
};
//const fuse = new Fuse(types, options);

@Injectable()
export class TypesService {
  private types: any;
  private fuse:any;
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {
    this.init();
    
  }

  async init() {
    //const productsTemp = plainToClass(Product, productsJson);
   // const fuse = new Fuse(productsTemp, options);
    this.types = await this.db.collection('types').find().toArray();
    this.fuse=new Fuse(this.types,options);

    //console.log("Database===>"+JSON.stringify(this.types ));


}
  getTypes({ text, search }: GetTypesDto) {
    this.init();
    let data: Type[] = this.types;
    if (text?.replace(/%/g, '')) {
      data = this.fuse.search(text)?.map(({ item }) => item);
    }

    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          searchText.push({
            [key]: value,
          });
        }
      }

      data = this.fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    return data;
  }

  getTypeBySlug(slug: string): Type {
    return this.types.find((p) => p.slug === slug);
  }

  create(createTypeDto: CreateTypeDto) {
    return this.types[0];
  }

  findAll() {
    return `This action returns all types`;
  }

  findOne(id: number) {
    return `This action returns a #${id} type`;
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return this.types[0];
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
