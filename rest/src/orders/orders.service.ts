import { Injectable, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto, OrderPaginator } from './dto/get-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import ordersJson from '@db/orders.json';
import orderStatusJson from '@db/order-statuses.json';
import exportOrderJson from '@db/order-export.json';
import orderInvoiceJson from '@db/order-invoice.json';
import orderFilesJson from '@db/order-files.json';
import { plainToClass } from 'class-transformer';
import { Order, OrderFiles } from './entities/order.entity';
import { OrderStatus } from './entities/order-status.entity';
import { paginate } from 'src/common/pagination/paginate';
import {
  GetOrderStatusesDto,
  OrderStatusPaginator,
} from './dto/get-order-statuses.dto';
import {
  CheckoutVerificationDto,
  VerifiedCheckoutData,
} from './dto/verify-checkout.dto';
import {
  CreateOrderStatusDto,
  UpdateOrderStatusDto,
} from './dto/create-order-status.dto';
import { GetOrderFilesDto } from './dto/get-downloads.dto';
import Fuse from 'fuse.js';
import { Db, ObjectID } from 'mongodb';

//const orders = plainToClass(Order, ordersJson);
//const orderStatus = plainToClass(OrderStatus, orderStatusJson);

const options = {
  keys: ['name'],
  threshold: 0.3,
};
//const fuse = new Fuse(orderStatus, options);

//const orderFiles = plainToClass(OrderFiles, orderFilesJson);

@Injectable()
export class OrdersService {
  private orders: any;
  private orderStatus: any;
  private orderFiles: any;
  private fuse: any;

  constructor(

    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {
    this.init();

  }

  async init() {
    //const productsTemp = plainToClass(Product, productsJson);
    // const fuse = new Fuse(productsTemp, options);
    this.orders = await this.db.collection('orders').find().toArray();
    this.orderStatus = await this.db.collection('order-statuses').find().toArray();
    this.fuse = new Fuse(this.orderStatus, options);
    this.orderFiles = await this.db.collection('order-files').find().toArray();
    //console.log("Database===>"+JSON.stringify(this.orders ));


  }

  async create(createOrderInput: CreateOrderDto) {

    console.log("create==>",createOrderInput);
    const order = await this.db.collection('orders').insertOne(createOrderInput);
    if (order.acknowledged) {
      return createOrderInput;
    }
    return null;

  }

  async getOrders({
    limit,
    page,
    customer_id,
    tracking_number,
    search,
    shop_id,
  }: GetOrdersDto): Promise<OrderPaginator> {

    console.log("customer_id ===>",customer_id)
    console.log("page ===>",page);
    console.log("search ===>",search);
    console.log("limit ===>",limit);

    if (!page) page = 1;
    if (!limit) limit = 15;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    let data: any[] = await this.db.collection('orders').find({customer_id:Number(customer_id)}).toArray();
    const results = data.slice(startIndex, endIndex);
    const url = `/orders?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getOrderById(id: string): Promise<Order> {

    const orderTemp:any=  await this.db.collection('orders').findOne(
      {
        $or: [
          { tracking_number: id },
          { id: id }

        ]
      }
    );

    console.log("Order ===>",orderTemp)
    return orderTemp;
   

  }

  

  async getOrderStatuses({
    limit,
    page,
    search,
    orderBy,
  }: GetOrderStatusesDto): Promise<OrderStatusPaginator> {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: any[] = await this.db.collection('order-statuses').find().toArray();

    // if (shop_id) {
    //   data = this.orders?.filter((p) => p?.shop?.id === shop_id);
    // }

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
    const url = `/order-status?search=${search}&limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getOrderStatus(param: string, language: string) {
    return this.orderStatus.find((p) => p.slug === param);
  }

  update(id: number, updateOrderInput: UpdateOrderDto) {
    return this.orders[0];
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  verifyCheckout(input: CheckoutVerificationDto): VerifiedCheckoutData {
    return {
      total_tax: 0,
      shipping_charge: 0,
      unavailable_products: [],
      wallet_currency: 0,
      wallet_amount: 0,
    };
  }

  async createOrderStatus(createOrderStatusInput: CreateOrderStatusDto) {
    const orderStatus = await this.db.collection('order-statuses').insertOne(createOrderStatusInput);
    return orderStatus;
  }

  async updateOrderStatus(updateOrderStatusInput: UpdateOrderStatusDto) {
    return this.orderStatus[0];
  }

  async getOrderFileItems({ page, limit }: GetOrderFilesDto) {
    if (!page) page = 1;
    if (!limit) limit = 30;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = this.orderFiles.slice(startIndex, endIndex);

    const url = `/downloads?&limit=${limit}`;
    return {
      data: results,
      ...paginate(this.orderFiles.length, page, limit, results.length, url),
    };
  }

  async getDigitalFileDownloadUrl(digitalFileId: number) {
    const item: OrderFiles = this.orderFiles.find(
      (singleItem) => singleItem.digital_file_id === digitalFileId,
    );

    return item.file.url;
  }

  async exportOrder(shop_id: string) {
    return exportOrderJson.url;
  }

  async downloadInvoiceUrl(shop_id: string) {
    return orderInvoiceJson[0].url;
  }
}
