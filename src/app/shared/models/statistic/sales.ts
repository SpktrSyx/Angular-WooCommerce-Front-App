import { TotalByMonth } from './total-by-month';

export class Sales {

    public totalSales: string;
    public netSales: string;
    public averageSales: string;
    public totalOrders: number;
    public totalItems: number;
    public totalTax: string;
    public totalShipping: string;
    public totalRefunds: number;
    public totalDiscount: number;
    public totalsGroupBy: string;
    public totals: {
        jan: TotalByMonth;
        fev: TotalByMonth;
        mar: TotalByMonth;
        avr: TotalByMonth;
        mai: TotalByMonth;
        juin: TotalByMonth;
        juil: TotalByMonth;
        aou: TotalByMonth;
        sept: TotalByMonth;
        oct: TotalByMonth;
        nov: TotalByMonth;
        dec: TotalByMonth;
    }
}
