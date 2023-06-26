"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = exports.GoFoodServiceImpl = void 0;
const driver_1 = require("../model/driver");
Object.defineProperty(exports, "Driver", { enumerable: true, get: function () { return driver_1.Driver; } });
const restaurant_1 = require("../model/restaurant");
const food_1 = require("../model/food");
class GoFoodServiceImpl {
    deliveryPrice(from, to) {
        return (from.length + to.length) * 2000;
    }
    calculatePrice(quantity, price) {
        return (quantity * price);
    }
    findDriver() {
        const driver = new driver_1.Driver();
        driver.driverName = 'Driver 1';
        driver.platNo = 'B 1469 AUS';
        driver.telpNo = '08112235687';
        return driver;
    }
    showRestaurant() {
        let restaurants = [];
        const restaurantOne = new restaurant_1.Restaurant();
        restaurantOne.restaurantName = 'Restoran Hemat';
        let foodsOne = [];
        for (let i = 1; i <= 5; i++) {
            const food = new food_1.Food();
            food.foodName = `Paket Hemat ${i}`;
            food.price = i * 10000;
            foodsOne.push(food);
        }
        restaurantOne.foods = Object.assign({}, foodsOne);
        restaurants.push(restaurantOne);
        const restaurantTwo = new restaurant_1.Restaurant();
        restaurantTwo.restaurantName = 'Paket Mahal';
        let foodsTwo = [];
        for (let i = 1; i <= 5; i++) {
            const food = new food_1.Food();
            food.foodName = `Paket Mahal ${i}`;
            food.price = i * 20000;
            foodsTwo.push(food);
        }
        restaurantTwo.foods = Object.assign({}, foodsTwo);
        restaurants.push(restaurantTwo);
        const restaurantThree = new restaurant_1.Restaurant();
        restaurantThree.restaurantName = 'Ayam Goreng';
        let foodsThree = [];
        for (let i = 1; i <= 5; i++) {
            const food = new food_1.Food();
            food.foodName = `${i} Ayam Goreng`;
            food.price = i * 15000;
            foodsThree.push(food);
        }
        restaurantThree.foods = Object.assign({}, foodsThree);
        restaurants.push(restaurantThree);
        const restaurantFour = new restaurant_1.Restaurant();
        restaurantFour.restaurantName = 'Pangsit Goreng';
        let foodsFour = [];
        for (let i = 1; i <= 5; i++) {
            const food = new food_1.Food();
            food.foodName = `${i} Pangsit Goreng`;
            food.price = i * 10000;
            foodsFour.push(food);
        }
        restaurantFour.foods = Object.assign({}, foodsFour);
        restaurants.push(restaurantFour);
        const restaurantFive = new restaurant_1.Restaurant();
        restaurantFive.restaurantName = 'Nasi Goreng';
        let foodsFive = [];
        for (let i = 1; i <= 5; i++) {
            const food = new food_1.Food();
            food.foodName = `Paket ${i} Nasi Goreng`;
            food.price = i * 10000;
            foodsFive.push(food);
        }
        restaurantFive.foods = Object.assign({}, foodsFive);
        restaurants.push(restaurantFive);
        return restaurants;
    }
}
exports.GoFoodServiceImpl = GoFoodServiceImpl;
