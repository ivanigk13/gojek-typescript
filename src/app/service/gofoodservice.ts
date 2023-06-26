import {Driver} from '../model/driver';
import {Restaurant} from '../model/restaurant';

interface GoFoodService {
    deliveryPrice(from : string, to : string) : number;
	calculatePrice(quantity: number, price: number) : number;
	findDriver() : Driver;
	showRestaurant() : Restaurant[];
}

export {GoFoodService};