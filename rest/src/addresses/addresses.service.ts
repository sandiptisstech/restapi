import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {

  constructor( 
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) 
  {

    this.init();
    
  }

  async init() {
    //const productsTemp = plainToClass(Product, productsJson);
   // const fuse = new Fuse(productsTemp, options);
  //  this.orders = await this.db.collection('orders').find().toArray();)

  }
  create(createAddressDto: CreateAddressDto) {

    const addresse=this.db.collection('addresses').insertOne(createAddressDto);
    return addresse;
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    this.db.collection('addresses').updateOne({ id: `${id}`},updateAddressDto)
    return `This action updates a # address`;
  }

  remove(id: number) {
    return [];
  }
}
