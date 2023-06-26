import { Driver } from '../model/driver';

interface GoSendService {
    calculatePrice(from : string, to : string, weight : number) : number;
	findDriver() : Driver;
}

export {GoSendService};