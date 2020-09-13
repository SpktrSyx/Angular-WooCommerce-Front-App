import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { StatisticService } from 'src/app/shared/services/statistic.service';
import { Sales } from 'src/app/shared/models/statistic/sales';
import {ChartErrorEvent, GoogleChartComponent} from 'angular-google-charts';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
    selector: 'app-statisticModal',
    templateUrl: './statisticModal.component.html',
    styleUrls: ['./statisticModal.component.css']
})
export class StatisticModalComponent implements AfterViewInit {
    public chart: GoogleChartComponent;
    
    public charts: Array<{
        title: string;
        type: string;
        data: Array<Array<string | number | {}>>;
        roles: Array<{ type: string; role: string; index?: number }>;
        columns: Array<string>;
        options: {};
    }> = [];

    // public changingChart = {
    //     title: 'Changing Chart',
    //     type: 'BarChart',
    //     data: [['Copper', 8.94], ['Silver', 10.49], ['Gold', 19.3], ['Platinum', 21.45]],
    //     columnNames: ['Element', 'Density'],
    //     options: {
    //         animation: {
    //             duration: 250,
    //             easing: 'ease-in-out',
    //             startup: true
    //         }
    //     }
    // };

    
    @ViewChild('chart', {static: true})
    private statistic: Sales[];  
    
    constructor(
        private modalCtrl: ModalController,
        private navParam: NavParams,
        private statisticService: StatisticService,
        private messageService: MessageService
    ) {
        const modal = this.modalCtrl;
        let year = this.navParam.get('year');
        
        this.statisticService.get(year)
            .then((data) => { this.statistic = data, console.log(this.statistic[0]) 
                this.charts.push({
                    title: 'Total des commandes et des clients en unité',
                    type: 'LineChart',
                    columns: ['Mois', 'Commandes', 'Clients'],
                    data : [
                        ["Jan", this.statistic[0].totals[`${year}`+'-01'].orders, this.statistic[0].totals[`${year}`+'-01'].customers],
                        ["Fev", this.statistic[0].totals[`${year}`+'-02'].orders, this.statistic[0].totals[`${year}`+'-02'].customers],
                        ["Mar", this.statistic[0].totals[`${year}`+'-03'].orders, this.statistic[0].totals[`${year}`+'-03'].customers],
                        ["Avr", this.statistic[0].totals[`${year}`+'-04'].orders, this.statistic[0].totals[`${year}`+'-04'].customers],
                        ["Mai", this.statistic[0].totals[`${year}`+'-05'].orders, this.statistic[0].totals[`${year}`+'-05'].customers],
                        ["Jui", this.statistic[0].totals[`${year}`+'-06'].orders, this.statistic[0].totals[`${year}`+'-06'].customers],
                        ["Jui", this.statistic[0].totals[`${year}`+'-07'].orders, this.statistic[0].totals[`${year}`+'-07'].customers],
                        ["Aou", this.statistic[0].totals[`${year}`+'-08'].orders, this.statistic[0].totals[`${year}`+'-08'].customers],
                        ["Sep", this.statistic[0].totals[`${year}`+'-09'].orders, this.statistic[0].totals[`${year}`+'-09'].customers],
                        ["Oct", this.statistic[0].totals[`${year}`+'-10'].orders, this.statistic[0].totals[`${year}`+'-10'].customers],
                        ["Nov", this.statistic[0].totals[`${year}`+'-11'].orders, this.statistic[0].totals[`${year}`+'-11'].customers],
                        ["Dec", this.statistic[0].totals[`${year}`+'-12'].orders, this.statistic[0].totals[`${year}`+'-12'].customers]
                    ],
                    roles: [],
                    options : {   
                        hAxis: {
                           title: 'Mois'
                        },
                        vAxis:{
                           title: 'Unité'
                        },
                        lineWidth: 3,
                        curveType: 'function',
                        legend: { 
                            position: 'top' 
                        },
                        colors:["#1c91c0", "#43459d"],
                    },
                },
                {
                    title: 'Total des ventes en euro',
                    type: 'LineChart',
                    columns: ['Mois', 'Frais de port', 'Chiffre d\'affaire'],
                    data : [
                        ["Jan", Number(this.statistic[0].totals[`${year}`+'-01'].shipping), Number(this.statistic[0].totals[`${year}`+'-01'].sales)],
                        ["Fev", Number(this.statistic[0].totals[`${year}`+'-02'].shipping), Number(this.statistic[0].totals[`${year}`+'-02'].sales)],
                        ["Mar", Number(this.statistic[0].totals[`${year}`+'-03'].shipping), Number(this.statistic[0].totals[`${year}`+'-03'].sales)],
                        ["Avr", Number(this.statistic[0].totals[`${year}`+'-04'].shipping), Number(this.statistic[0].totals[`${year}`+'-04'].sales)],
                        ["Mai", Number(this.statistic[0].totals[`${year}`+'-05'].shipping), Number(this.statistic[0].totals[`${year}`+'-05'].sales)],
                        ["Jui", Number(this.statistic[0].totals[`${year}`+'-06'].shipping), Number(this.statistic[0].totals[`${year}`+'-06'].sales)],
                        ["Jui", Number(this.statistic[0].totals[`${year}`+'-07'].shipping), Number(this.statistic[0].totals[`${year}`+'-07'].sales)],
                        ["Aou", Number(this.statistic[0].totals[`${year}`+'-08'].shipping), Number(this.statistic[0].totals[`${year}`+'-08'].sales)],
                        ["Sep", Number(this.statistic[0].totals[`${year}`+'-09'].shipping), Number(this.statistic[0].totals[`${year}`+'-09'].sales)],
                        ["Oct", Number(this.statistic[0].totals[`${year}`+'-10'].shipping), Number(this.statistic[0].totals[`${year}`+'-10'].sales)],
                        ["Nov", Number(this.statistic[0].totals[`${year}`+'-11'].shipping), Number(this.statistic[0].totals[`${year}`+'-11'].sales)],
                        ["Dec", Number(this.statistic[0].totals[`${year}`+'-12'].shipping), Number(this.statistic[0].totals[`${year}`+'-12'].sales)]
                    ],
                    roles: [],
                    options : {   
                        hAxis: {
                            title: 'Mois'
                        },
                        vAxis:{
                            title: 'Euros' 
                        },
                        lineWidth: 3,
                        curveType: 'function',
                        legend: { 
                            position: 'top' 
                        },
                        colors:["#f1ca3a", "#e2431e"],
                    }
                }
            );
        })
            .catch((error) => { 
                this.messageService.presentToast('Impossible de récupérer la liste des statistiques', 'error');
                console.log(error) 
            });

            
}

    async closeModal() {
        await this.modalCtrl.dismiss().then();
    }

    ngAfterViewInit() {
    }

}
