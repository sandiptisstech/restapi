import { CoreEntity } from 'src/common/entities/core.entity';
import { OrderStatus } from '../entities/order-status.entity';
import { PaymentGatewayType } from '../entities/order.entity';

export class CreateOrderDto  {
  tracking_number?: string;
  shop_id?: number;
  coupon_id?: number;
  status: OrderStatus;
  customer_contact: string;
  products: ConnectProductOrderPivot[];
  amount: number;
  sales_tax: number;
  total?: number;
  paid_total?: number;
  payment_id?: string;
  payment_gateway?: PaymentGatewayType;
  discount?: number;
  delivery_fee?: number;
  delivery_time: string;
  card?: CardInput;
  billing_address?: UserAddressInput;
  shipping_address?: UserAddressInput;
  language?: string;
  customer_id?: number;
  created_at?: Date; 
  updated_at?: Date;
  
}

export class UserAddressInput {
  street_address: string;
  country: string;
  city: string;
  state: string;
  zip: string;
}

export class ConnectProductOrderPivot {
  product_id: number;
  variation_option_id?: number;
  order_quantity: number;
  unit_price: number;
  subtotal: number;
  name: string;
  slug: string;
  description:string;
  type_id: number; 

}

export class CardInput {
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  email?: string;
}
