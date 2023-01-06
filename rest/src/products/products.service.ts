import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto, ProductPaginator } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { paginate } from 'src/common/pagination/paginate';
import productsJson from '@db/products.json';
import Fuse from 'fuse.js';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
//import {MongoModule} from '../common/mongo.module';
import { Db, ObjectID } from 'mongodb';

//const products = plainToClass(Product, productsJson);


const options = {
  keys: [
    'name',
    'type.slug',
    'categories.slug',
    'status',
    'shop_id',
    'author.slug',
    'tags',
    'manufacturer.slug',
  ],
  threshold: 0.3,
};
//const fuse = new Fuse(products, options);

@Injectable()
export class ProductsService {
  private products: any ;
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
    this.products = await this.db.collection('products').find().toArray();
    this.fuse = new Fuse(this.products, options);
    //console.log("Database===>"+JSON.stringify(this.products ));


}
  
  create(createProductDto: CreateProductDto) {
    return this.products[0];
  }

  async getProducts({ limit, page, search }: GetProductsDto): Promise<ProductPaginator> {
    this.init();
    
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Product[] = this.products;
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
    const url = `/products?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async  getProductBySlug(slug: string): Promise<Product> {

    
    const product = this.products.find((p) => p.slug === slug);
    const related_products = this.products
      .filter((p) => p.type.slug === product.type.slug)
      .slice(0, 20);
    return {
      ...product,
      related_products,
    };
  }

  async getPopularProducts({ limit, type_slug }: GetPopularProductsDto): Promise<Product[]> {
 
    let data: any = this.products;
    if (type_slug) {
      data = this.fuse.search(type_slug)?.map(({ item }) => item);
    }
    return data?.slice(0, limit);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.products[0];
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
