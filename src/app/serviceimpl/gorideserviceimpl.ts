import { Driver } from '../model/driver';
import { HistoryBuyer } from '../model/history';
import { GoRideService } from '../service/gorideservice';

class GoRideServiceImpl implements GoRideService {

    calculatePrice(from: string, to: string): number {
        return (from.length + to.length)*2000;
    }

    findDriver(): Driver {
        const driver : Driver = new Driver();
        driver.driverName = 'Driver 1';
        driver.platNo = 'B 1469 AUS';
        driver.telpNo = '08112235687';
        return driver;
    }

    insertRideToHistory(histories: HistoryBuyer[], total: number): HistoryBuyer[] {
        const historiesTemp : HistoryBuyer[] = {...histories};

		let rideHistory : number = 1;
		for(let i = 0; i < histories.length; i++) {
			if(histories[i].type = 'Go Ride') {
				rideHistory++;
			}
		}
		let nomorTransaksi : string = 'GR-';
		if(rideHistory<10) {
			nomorTransaksi += "0"+String(rideHistory);
		}else {
			nomorTransaksi += String(rideHistory);
		}

        const history : HistoryBuyer = new HistoryBuyer();
		history.nomorTransaksi = nomorTransaksi;
		history.type = 'Go Ride';
		history.total = total;
		historiesTemp.push(history);
		
		return historiesTemp;
    }

}

export {GoRideServiceImpl, GoRideService, Driver};