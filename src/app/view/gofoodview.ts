import { askString, askNumber} from '../util/scanner';
import { MainView} from './mainview';
import { GoFoodServiceImpl, GoFoodService, Driver} from '../serviceimpl/gofoodserviceimpl';
import { HistoryBuyer } from '../model/history';
import { Restaurant } from '../model/restaurant';
import { Food } from '../model/food';
import { Basket } from '../model/basket';

class GoFoodView {
    
    constructor(private mainView : MainView, private goFoodService : GoFoodService){}    
    
    private restaurants : Restaurant[] = [];
    private foods : Food[] = [];
    private baskets : Basket[] = [];
    private from : string = '';
    private to : string = '';

    async show() : Promise<void> {
        console.log('1. List Restoran');
		console.log('2. Back');
		const choose : number = await askNumber("Pilih >> ");
        if(choose == 1){
            this.from = await askString('Input from: ');
		    this.to = await askString('Input to: ');

            this.goFoodService = new GoFoodServiceImpl();
            this.restaurants = this.goFoodService.showRestaurant();
            for(let i = 0; i < this.restaurants.length ; i++) {
                console.log(`${(i+1)}. ${this.restaurants[i].restaurantName}`);
            }
            const inputRestaurant = await askNumber("Pilih restoran: ");
            this.foods = this.goFoodService.showRestaurant()[inputRestaurant-1].foods;
            
            this.addFood(this.foods);
        }else{
            this.mainView.show();
        }
    }

    async addFood(foods : Food[]) : Promise<void>{
        console.log('No. Food Name Price')
        for(let i = 0; i < Object.keys(foods).length; i++) {
            console.log(`${(i+1)}. ${foods[i].foodName} ${foods[i].price}`);
        }
        const inputFood : number = await askNumber('Pilih makanan: ');
        const quantity : number = await askNumber('Jumlah makanan: ');

        if(this.baskets.length == 0){
            const basket : Basket = new Basket();
            basket.index = inputFood;
            basket.quantity = quantity;
            this.baskets.push(basket);
        }else{
            let index : number = -1;
            for(let i = 0; i < this.baskets.length; i++){
                if(this.baskets[i].index == inputFood){
                    index = i;
                    break;
                }
            }
            
            if(index == -1){
                const basket : Basket = new Basket();
                basket.index = inputFood;
                basket.quantity = quantity;
                this.baskets.push(basket);
            }else{
                this.baskets[index].quantity += quantity;
            }
        }

        this.subMenu();
    }
    
    async subMenu() : Promise<void> {
        console.log('1. Add again');
		console.log('2. Edit quantity');
		console.log('3. Remove by index');
		console.log('4. Remove all');
		console.log('5. Checkout');
		const input : number = await askNumber('>> ');
        switch(input){
            case 1: this.addFood(this.foods); break;
            case 2: this.editQuantity(); break;
            case 3: this.removeByIndex(); break;
            case 4: this.removeAll(); break;
            case 5: this.checkout(); break;
            default: this.subMenu(); break;
        }
    }

    async editQuantity() : Promise<void> {
        if(this.baskets.length != 0){
            console.log('No. Food Name Quantity');
            for(let i = 0; i < this.baskets.length; i++) {
                const foodName : string = this.foods[this.baskets[i].index].foodName;
                const quantity : number = this.baskets[i].quantity;
                console.log(`${(i+1)}. ${foodName} ${quantity}`);
            }
            const index : number = await askNumber('Pilih index untuk diubah: ');
            const quantity : number = await askNumber('Masukan kuantitas baru: ');
            this.baskets[index-1].quantity = quantity;
        }
        this.subMenu();
    }

    async removeByIndex() : Promise<void> {
        if(this.baskets.length != 0){
            console.log('No. Food Name Price')
            for(let i = 0; i < this.baskets.length; i++) {
                const foodName : string = this.foods[this.baskets[i].index].foodName;
                const price : number = this.foods[this.baskets[i].index].price;
                console.log(`${(i+1)}. ${foodName} ${price}`);
            }
            const index : number = await askNumber('Pilih index untuk dihapus: ');
            for(let i = 0; i < this.baskets.length; i++){
                if(i == index-1){
                    this.baskets.shift();
                }else{
                    this.baskets.push(this.baskets[0]);
                    this.baskets.shift();
                }
            }
        }
        this.subMenu();
    }

    removeAll() : void {
        this.baskets = [];
    }

    async checkout() : Promise<void> {
        const receiver : string = await askString('Masukan receiver: ');
        this.goFoodService = new GoFoodServiceImpl();
        const deliveryPrice : number = this.goFoodService.deliveryPrice(this.from, this.to);
        let totalPrice : number = 0;
        for(let i = 0; i < this.baskets.length; i++){
            const quantity : number = this.baskets[i].quantity;
            const price : number = this.foods[this.baskets[i].index-1].price;
            totalPrice += this.goFoodService.calculatePrice(quantity, price);
        }
        totalPrice += deliveryPrice;
        const driver : Driver = this.goFoodService.findDriver();

        console.log('=== Food Detail ===');
		console.log('=== Driver ===');
        console.log(driver.driverName);
		console.log(driver.platNo);
		console.log(driver.telpNo);
        console.log('=== Item Detail ===');
		for(let i = 0; i < this.baskets.length; i++) {
			const foodName : string = this.foods[this.baskets[i].index-1].foodName;
            const quantity : number = this.baskets[i].quantity;
			console.log('Nama Makanan:', foodName);
			console.log('Jumlah makanan:', quantity);
		}
		console.log('Penerima: ', receiver);
		console.log('Harga: ', totalPrice);

        this.baskets = [];

        const tempTransactionNumber : number = this.getTransactionNumber(this.mainView.getHistory());
		let nomorTransaksi : string = '';
		if(tempTransactionNumber < 10 ) {
			nomorTransaksi = `GF-0${String(tempTransactionNumber)}`;
		}else {
			nomorTransaksi = `GF-${+String(tempTransactionNumber)}`;
		}
		
		const history : HistoryBuyer = new HistoryBuyer();
		history.nomorTransaksi = nomorTransaksi;
		history.type = 'Go Food';
		history.total = totalPrice;
        
		this.mainView.setHistory(history);
		this.mainView.show();
    }

    getTransactionNumber(histories : HistoryBuyer[]) : number {
        let rideHistory : number = 1;
		for(let i = 0; i < histories.length; i++) {
			if(histories[i].type  == 'Go Food') {
				rideHistory++;
			}
		}
		return rideHistory;
    }
}

export {GoFoodView};

