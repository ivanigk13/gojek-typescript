import { askString, askNumber} from '../util/scanner';
import { MainView} from './mainview';
import { GoSendServiceImpl, GoSendService, Driver} from '../serviceimpl/gosendserviceimpl';
import { GoodTypes} from '../constant/goodtypes';
import { HistoryBuyer } from '../model/history';

class GoSendView {
    
    constructor(private mainView : MainView, private goSendService : GoSendService){}

    async show() : Promise<void> {
        const from : string = await askString('Input from: ');
		const to : string = await askString('Input to: ');

        console.log('Jenis-jenis barang:');
        console.log(`- ${GoodTypes.DOKUMEN}`);
        console.log(`- ${GoodTypes.PECAH}`);
        console.log(`- ${GoodTypes.TIDAK_PECAH}`);
		const goodType : string = await askString('Input Jenis Barang: ');
		const weight : number = await askNumber('Berat: ');		
		const receiver : string = await askString('Receiver: ');
		
		this.goSendService = new GoSendServiceImpl();
		const price : number = this.goSendService.calculatePrice(from, to, weight);
		const driver : Driver = this.goSendService.findDriver();
		
		console.log('=== Order Detail ===');
		console.log('=== Driver ===');
		console.log(driver.driverName);
		console.log(driver.platNo);
		console.log(driver.telpNo);
		console.log('=== Item Detail ===');
		console.log(`Jenis Barang: ${goodType}`);
		console.log(`Berat Barang: ${weight}`);
		console.log(`Penerima: ${receiver}`);
		console.log(`Harga: ${price}`);

        const tempTransactionNumber : number = this.getTransactionNumber(this.mainView.getHistory());
		let nomorTransaksi : string = '';
		if(tempTransactionNumber < 10 ) {
			nomorTransaksi = `GS-0${String(tempTransactionNumber)}`;
		}else {
			nomorTransaksi = `GS-${+String(tempTransactionNumber)}`;
		}
		
		const history : HistoryBuyer = new HistoryBuyer();
		history.nomorTransaksi = nomorTransaksi;
		history.type = 'Go Send';
		history.total = price;
	
		this.mainView.setHistory(history);
		this.mainView.show();
    }

    getTransactionNumber(histories : HistoryBuyer[]) : number {
        let rideHistory : number = 1;
		for(let i = 0; i < histories.length; i++) {
			if(histories[i].type  == 'Go Send') {
				rideHistory++;
			}
		}
		return rideHistory;
    }

}

export {GoSendView};