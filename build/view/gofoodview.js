"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoFoodView = void 0;
const scanner_1 = require("../util/scanner");
const gofoodserviceimpl_1 = require("../serviceimpl/gofoodserviceimpl");
const history_1 = require("../model/history");
const basket_1 = require("../model/basket");
class GoFoodView {
    constructor(mainView, goFoodService) {
        this.mainView = mainView;
        this.goFoodService = goFoodService;
        this.restaurants = [];
        this.foods = [];
        this.baskets = [];
        this.from = '';
        this.to = '';
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.baskets.length);
            console.log('1. List Restoran');
            console.log('2. Keluar');
            const choose = yield (0, scanner_1.askNumber)("Pilih >> ");
            if (choose == 1) {
                this.from = yield (0, scanner_1.askString)('Input from: ');
                this.to = yield (0, scanner_1.askString)('Input to: ');
                this.goFoodService = new gofoodserviceimpl_1.GoFoodServiceImpl();
                this.restaurants = this.goFoodService.showRestaurant();
                for (let i = 0; i < this.restaurants.length; i++) {
                    console.log(`${(i + 1)}. ${this.restaurants[i].restaurantName}`);
                }
                const inputRestaurant = yield (0, scanner_1.askNumber)("Pilih restoran: ");
                this.foods = this.goFoodService.showRestaurant()[inputRestaurant - 1].foods;
                this.addFood(this.foods);
            }
            else {
                this.mainView.show();
            }
        });
    }
    addFood(foods) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('No. Food Name Price');
            for (let i = 0; i < Object.keys(foods).length; i++) {
                console.log(`${(i + 1)}. ${foods[i].foodName} ${foods[i].price}`);
            }
            const inputFood = yield (0, scanner_1.askNumber)('Pilih makanan: ');
            const quantity = yield (0, scanner_1.askNumber)('Jumlah makanan: ');
            if (this.baskets.length == 0) {
                const basket = new basket_1.Basket();
                basket.index = inputFood;
                basket.quantity = quantity;
                this.baskets.push(basket);
            }
            else {
                let index = -1;
                for (let i = 0; i < this.baskets.length; i++) {
                    if (this.baskets[i].index == inputFood) {
                        index = i;
                        break;
                    }
                }
                if (index == -1) {
                    const basket = new basket_1.Basket();
                    basket.index = inputFood;
                    basket.quantity = quantity;
                    this.baskets.push(basket);
                }
                else {
                    this.baskets[index].quantity += quantity;
                }
            }
            this.subMenu();
        });
    }
    subMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('1. Add again');
            console.log('2. Edit quantity');
            console.log('3. Remove by index');
            console.log('4. Remove all');
            console.log('5. Checkout');
            const input = yield (0, scanner_1.askNumber)('>> ');
            switch (input) {
                case 1:
                    this.addFood(this.foods);
                    break;
                case 2:
                    this.editQuantity();
                    break;
                case 3:
                    this.removeByIndex();
                    break;
                case 4:
                    this.removeAll();
                    break;
                case 5:
                    this.checkout();
                    break;
                default:
                    this.subMenu();
                    break;
            }
        });
    }
    editQuantity() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.baskets.length != 0) {
                console.log('No. Food Name Quantity');
                for (let i = 0; i < this.baskets.length; i++) {
                    const foodName = this.foods[this.baskets[i].index].foodName;
                    const quantity = this.baskets[i].quantity;
                    console.log(`${(i + 1)}. ${foodName} ${quantity}`);
                }
                const index = yield (0, scanner_1.askNumber)('Pilih index untuk diubah: ');
                const quantity = yield (0, scanner_1.askNumber)('Masukan kuantitas baru: ');
                this.baskets[index - 1].quantity = quantity;
            }
            this.subMenu();
        });
    }
    removeByIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.baskets.length != 0) {
                console.log('No. Food Name Price');
                for (let i = 0; i < this.baskets.length; i++) {
                    const foodName = this.foods[this.baskets[i].index].foodName;
                    const price = this.foods[this.baskets[i].index].price;
                    console.log(`${(i + 1)}. ${foodName} ${price}`);
                }
                const index = yield (0, scanner_1.askNumber)('Pilih index untuk dihapus: ');
                for (let i = 0; i < this.baskets.length; i++) {
                    if (i == index - 1) {
                        this.baskets.shift();
                    }
                    else {
                        this.baskets.push(this.baskets[0]);
                        this.baskets.shift();
                    }
                }
            }
            this.subMenu();
        });
    }
    removeAll() {
        this.baskets = [];
    }
    checkout() {
        return __awaiter(this, void 0, void 0, function* () {
            const receiver = yield (0, scanner_1.askString)('Masukan receiver: ');
            this.goFoodService = new gofoodserviceimpl_1.GoFoodServiceImpl();
            const deliveryPrice = this.goFoodService.deliveryPrice(this.from, this.to);
            let totalPrice = 0;
            for (let i = 0; i < this.baskets.length; i++) {
                const quantity = this.baskets[i].quantity;
                const price = this.foods[this.baskets[i].index - 1].price;
                totalPrice += this.goFoodService.calculatePrice(quantity, price);
            }
            totalPrice += deliveryPrice;
            const driver = this.goFoodService.findDriver();
            console.log('=== Food Detail ===');
            console.log('=== Driver ===');
            console.log(driver.driverName);
            console.log(driver.platNo);
            console.log(driver.telpNo);
            console.log('=== Item Detail ===');
            for (let i = 0; i < this.baskets.length; i++) {
                const foodName = this.foods[this.baskets[i].index - 1].foodName;
                const quantity = this.baskets[i].quantity;
                console.log('Nama Makanan:', foodName);
                console.log('Jumlah makanan:', quantity);
            }
            console.log('Penerima: ', receiver);
            console.log('Harga: ', totalPrice);
            const tempTransactionNumber = this.getTransactionNumber(this.mainView.getHistory());
            let nomorTransaksi = '';
            if (tempTransactionNumber < 10) {
                nomorTransaksi = `GF-0${String(tempTransactionNumber)}`;
            }
            else {
                nomorTransaksi = `GF-${+String(tempTransactionNumber)}`;
            }
            const history = new history_1.HistoryBuyer();
            history.nomorTransaksi = nomorTransaksi;
            history.type = 'Go Food';
            history.total = totalPrice;
            this.mainView.setHistory(history);
            this.mainView.show();
        });
    }
    getTransactionNumber(histories) {
        let rideHistory = 1;
        for (let i = 0; i < histories.length; i++) {
            if (histories[i].type == 'Go Food') {
                rideHistory++;
            }
        }
        return rideHistory;
    }
}
exports.GoFoodView = GoFoodView;
