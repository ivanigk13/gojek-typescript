import { GoFoodServiceImpl, GoFoodService } from '../serviceimpl/gofoodserviceimpl';
import { GoSendServiceImpl, GoSendService } from '../serviceimpl/gosendserviceimpl';
import { GoRideServiceImpl, GoRideService } from '../serviceimpl/gorideserviceimpl';
import { GoFoodView } from './gofoodview';
import { GoSendView } from './gosendview';
import { GoRideView } from './gorideview';
import { HistoryView } from './historyview';
import { askNumber, sc } from '../util/scanner';
import { HistoryBuyer } from '../model/history';

class MainView{

    private histories : HistoryBuyer[] = [];

    private goRideView : GoRideView;
    private goSendView : GoSendView;
    private goFoodView : GoFoodView;
    private historyView : HistoryView;

    private goRideService : GoRideService;
    private goSendService : GoSendService;
    private goFoodService : GoFoodService;

    constructor(){
        this.goRideService = new GoRideServiceImpl();
        this.goSendService = new GoSendServiceImpl();
        this.goFoodService = new GoFoodServiceImpl();

        this.goRideView = new  GoRideView(this, this.goRideService);
        this.goSendView = new  GoSendView(this, this.goSendService);
        this.goFoodView = new  GoFoodView(this, this.goFoodService);
        this.historyView = new HistoryView(this);
    }

    async show() : Promise<void>{
        console.log('=== Gojek App ===');
		console.log('1. Go-Ride');
		console.log('2. Go-Send');
		console.log('3. Go-Food');
		console.log('4. History');
		const choose : number = await askNumber('Pilih [0 untuk keluar] >> ');
        switch(choose){
            case 0: sc.close(); break;
            case 1: this.goRideView.show(); break;
            case 2: this.goSendView.show(); break;
            case 3: this.goFoodView.show(); break;
            case 4: this.historyView.show(); break;
            default: this.show();break;
        }
    }

    setHistory(history : HistoryBuyer) : void{
        this.histories.push(history);
    }

    getHistory() : HistoryBuyer[] {
        return this.histories;
    }
}

export {MainView};