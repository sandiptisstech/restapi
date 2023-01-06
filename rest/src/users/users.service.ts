import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto, UserPaginator } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Fuse from 'fuse.js';

import { User } from './entities/user.entity';
import usersJson from '@db/users.json';
import { paginate } from 'src/common/pagination/paginate';
import { Db } from 'mongodb';
import { profile } from 'console';

//const users = plainToClass(User, usersJson);

const options = {
  keys: ['name', 'type.slug', 'categories.slug', 'status'],
  threshold: 0.3,
};

@Injectable()
export class UsersService {
  private users: any[];
  private fuse: any;
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {
    this.init();
  }

  async init() {

    this.users = await this.db.collection('users').find().toArray();
    this.fuse = new Fuse(this.users, options);
  }
  async create(createUserDto: CreateUserDto) { 
    const user = await this.db.collection('users').insertOne(createUserDto);

    return user;
  }

  async getUsers({
    text,
    limit,
    page,
    search,
  }: GetUsersDto): Promise<UserPaginator> {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: User[] = this.users;
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

    const results = data.slice(startIndex, endIndex);
    const url = `/users?limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async findOne(id: number) {
    const userData=  await this.db.collection('users').findOne({ id:id })
    return userData;
    //this.users.find((user) => user.id === id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    
    const user = await this.db.collection('users').updateOne({ id:id }, { $set :{ ...updateUserDto}});

    if(user.acknowledged)
    return updateUserDto;
    
      return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  makeAdmin(user_id: string) {
    return this.users.find((u) => u.id === Number(user_id));
  }

  banUser(id: number) {
    const user = this.users.find((u) => u.id === Number(id));

    user.is_active = !user.is_active;

    return user;
  }

  activeUser(id: number) {
    const user = this.users.find((u) => u.id === Number(id));

    user.is_active = !user.is_active;

    return user;
  }
}
