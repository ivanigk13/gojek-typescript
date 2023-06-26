"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = exports.GoRideServiceImpl = void 0;
const driver_1 = require("../model/driver");
Object.defineProperty(exports, "Driver", { enumerable: true, get: function () { return driver_1.Driver; } });
const history_1 = require("../model/history");
class GoRideServiceImpl {
    calculatePrice(from, to) {
        return (from.length + to.length) * 2000;
    }
    findDriver() {
        const driver = new driver_1.Driver();
        driver.driverName = 'Driver 1';
        driver.platNo = 'B 1469 AUS';
        driver.telpNo = '08112235687';
        return driver;
    }
    insertRideToHistory(histories, total) {
        const historiesTemp = Object.assign({}, histories);
        let rideHistory = 1;
        for (let i = 0; i < histories.length; i++) {
            if (histories[i].type = 'Go Ride') {
                rideHistory++;
            }
        }
        let nomorTransaksi = 'GR-';
        if (rideHistory < 10) {
            nomorTransaksi += "0" + String(rideHistory);
        }
        else {
            nomorTransaksi += String(rideHistory);
        }
        const history = new history_1.HistoryBuyer();
        history.nomorTransaksi = nomorTransaksi;
        history.type = 'Go Ride';
        history.total = total;
        historiesTemp.push(history);
        return historiesTemp;
    }
}
exports.GoRideServiceImpl = GoRideServiceImpl;
