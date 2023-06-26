"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = exports.GoSendServiceImpl = void 0;
const driver_1 = require("../model/driver");
Object.defineProperty(exports, "Driver", { enumerable: true, get: function () { return driver_1.Driver; } });
class GoSendServiceImpl {
    calculatePrice(from, to, weight) {
        return (from.length + to.length) * 2000 + (weight * 100);
    }
    findDriver() {
        const driver = new driver_1.Driver();
        driver.driverName = 'Driver 1';
        driver.platNo = 'B 1469 AUS';
        driver.telpNo = '08112235687';
        return driver;
    }
}
exports.GoSendServiceImpl = GoSendServiceImpl;
