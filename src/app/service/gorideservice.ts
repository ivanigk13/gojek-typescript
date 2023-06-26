import {Driver} from '../model/driver';
import {HistoryBuyer} from '../model/history';

interface GoRideService {
    calculatePrice(from : string, to : string) : number;
	findDriver() : Driver;
    insertRideToHistory(histories : HistoryBuyer[], total : number) : HistoryBuyer[];
}

export {GoRideService};