import { askString} from '../util/scanner';
import { MainView} from './mainview';
import { GoRideServiceImpl, GoRideService, Driver} from '../serviceimpl/gorideserviceimpl';
import { HistoryBuyer } from '../model/history';

class GoRideView {
    
    constructor(private mainView : MainView, private goRideService : GoRideService){}

    async show() : Promise<void> {
        const from : string = await askString('Input from: ');
		const to : string = await askString('Input to: ');

        this.goRideService = new GoRideServiceImpl();
        const price : number = this.goRideService.calculatePrice(from, to);
        const driver : Driver = this.goRideService.findDriver();

        console.log('=== Order Detail ===');
		console.log('=== Driver ===');
		console.log(driver.driverName);
		console.log(driver.platNo);
		console.log(driver.telpNo);
		console.log('=== Total Price ===');
		console.log(`Rp. ${price}`);
		
		const tempTransactionNumber : number = this.getTransactionNumber(this.mainView.getHistory());
		let nomorTransaksi : string = '';
		if(tempTransactionNumber < 10 ) {
			nomorTransaksi = `GR-0${String(tempTransactionNumber)}`;
		}else {
			nomorTransaksi = `GR-${+String(tempTransactionNumber)}`;
		}
		
		const history : HistoryBuyer = new HistoryBuyer();
		history.nomorTransaksi = nomorTransaksi;
		history.type = 'Go Ride';
		history.total = price;
	
		this.mainView.setHistory(history);
		this.mainView.show();
    }

    getTransactionNumber(histories : HistoryBuyer[]) : number {
        let rideHistory : number = 1;
		for(let i = 0; i < histories.length; i++) {
			if(histories[i].type  == 'Go Ride') {
				rideHistory++;
			}
		}
		return rideHistory;
    }

}

export {GoRideView};