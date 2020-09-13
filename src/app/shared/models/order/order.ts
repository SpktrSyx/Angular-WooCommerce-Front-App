import { Shipping } from './shipping';
import { Product } from './product';
import { Payment } from './payment';

export class Order {

    public id: number;
    public itemsNb: number;
    public orderKey : string;
    public createdVia: string;
    public status: string;
    public currencySymbol: string;
    public dateCreation: Date;
    public dateModification: Date;
    public customerNote: string
    public product: Product;
    public shipping: Shipping;
    public payment: Payment;
    public trackingNumber?: any;
}
