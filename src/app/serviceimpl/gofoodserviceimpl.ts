import { Driver } from '../model/driver';
import { Restaurant } from '../model/restaurant';
import { Food } from '../model/food';
import { GoFoodService } from '../service/gofoodservice';

class GoFoodServiceImpl implements GoFoodService {

    deliveryPrice(from: string, to: string): number {
        return (from.length + to.length)*2000;
    }

    calculatePrice(quantity: number, price: number): number {
        return (quantity*price);
    }

    findDriver(): Driver {
        const driver : Driver = new Driver();
        driver.driverName = 'Driver 1';
        driver.platNo = 'B 1469 AUS';
        driver.telpNo = '08112235687';
        return driver;
    }

    showRestaurant(): Restaurant[] {
        let restaurants : Restaurant[] = [];
        
        const restaurantOne : Restaurant = new Restaurant();
        restaurantOne.restaurantName = 'Restoran Hemat';
        let foodsOne : Food[] = [];
        for(let i = 1; i<=5; i++) {
			const food : Food = new Food();
			food.foodName = `Paket Hemat ${i}`;
			food.price = i*10000;
			foodsOne.push(food);
		}
        restaurantOne.foods = {...foodsOne};
        restaurants.push(restaurantOne);

        const restaurantTwo : Restaurant = new Restaurant();
        restaurantTwo.restaurantName = 'Paket Mahal';
        let foodsTwo : Food[] = [];
        for(let i = 1; i<=5; i++) {
			const food : Food = new Food();
			food.foodName = `Paket Mahal ${i}`;
			food.price = i*20000;
			foodsTwo.push(food);
		}
        restaurantTwo.foods = {...foodsTwo};
        restaurants.push(restaurantTwo);

        const restaurantThree : Restaurant = new Restaurant();
        restaurantThree.restaurantName = 'Ayam Goreng';
        let foodsThree : Food[] = [];
        for(let i = 1; i<=5; i++) {
			const food : Food = new Food();
			food.foodName = `${i} Ayam Goreng`;
			food.price = i*15000;
			foodsThree.push(food);
		}
        restaurantThree.foods = {...foodsThree};
        restaurants.push(restaurantThree);

        const restaurantFour : Restaurant = new Restaurant();
        restaurantFour.restaurantName = 'Pangsit Goreng';
        let foodsFour : Food[] = [];
        for(let i = 1; i<=5; i++) {
			const food : Food = new Food();
			food.foodName = `${i} Pangsit Goreng`;
			food.price = i*10000;
			foodsFour.push(food);
		}
        restaurantFour.foods = {...foodsFour};
        restaurants.push(restaurantFour);

        const restaurantFive : Restaurant = new Restaurant();
        restaurantFive.restaurantName = 'Nasi Goreng';
        let foodsFive : Food[] = [];
        for(let i = 1; i<=5; i++) {
			const food : Food = new Food();
			food.foodName = `Paket ${i} Nasi Goreng`;
			food.price = i*10000;
			foodsFive.push(food);
		}
        restaurantFive.foods = {...foodsFive};
        restaurants.push(restaurantFive);

        return restaurants;
    }
}

export {GoFoodServiceImpl, GoFoodService, Driver};