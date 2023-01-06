import { Inject, Injectable } from '@nestjs/common';
 
import { CreateOrderDto } from './dto/razorpay-order.dto';
import axios from "axios";
import { Db, ObjectID } from 'mongodb';
import { CreatePaymentDto } from './dto/razorpay-payment.dto';
 
@Injectable()
export class RazorpayOrderService {
  private baseURL = "https://api.razorpay.com/v1/orders";
  private payment:any;
  private username = 'rzp_test_r2dAxBrb56JLsv'
  private password = '2RDJG0EyruQVkSnXWDEKtsRv'
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
    this.payment = await this.db.collection('payment').find().toArray();
   


}
  create(createOrderDto: CreateOrderDto) {
   
    const token = Buffer.from(`${this.username}:${this.password}`, 'utf8').toString('base64')

    const data= axios.post(this.baseURL,createOrderDto, 
     {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Basic ${token}`
      } 
     }
    ).then((res) => {
       console.log(JSON.stringify(res.data));
        return res.data;
    }).catch(err => {
      console.log(JSON.stringify(err));
        return  err;
    })

  return data;
  }

  createPayments(createPaymentDto: CreatePaymentDto) {
  
  this.db.collection('paymentinfos').insertOne(createPaymentDto).then((res) => {
      return res.acknowledged;
  }).catch(err => {
      return  err;
  }); 

  }

  
}
