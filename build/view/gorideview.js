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
exports.GoRideView = void 0;
const scanner_1 = require("../util/scanner");
const gorideserviceimpl_1 = require("../serviceimpl/gorideserviceimpl");
const history_1 = require("../model/history");
class GoRideView {
    constructor(mainView, goRideService) {
        this.mainView = mainView;
        this.goRideService = goRideService;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            const from = yield (0, scanner_1.askString)('Input from: ');
            const to = yield (0, scanner_1.askString)('Input to: ');
            this.goRideService = new gorideserviceimpl_1.GoRideServiceImpl();
            const price = this.goRideService.calculatePrice(from, to);
            const driver = this.goRideService.findDriver();
            console.log('=== Order Detail ===');
            console.log('=== Driver ===');
            console.log(driver.driverName);
            console.log(driver.platNo);
            console.log(driver.telpNo);
            console.log('=== Total Price ===');
            console.log(`Rp. ${price}`);
            const tempTransactionNumber = this.getTransactionNumber(this.mainView.getHistory());
            let nomorTransaksi = '';
            if (tempTransactionNumber < 10) {
                nomorTransaksi = `GR-0${String(tempTransactionNumber)}`;
            }
            else {
                nomorTransaksi = `GR-${+String(tempTransactionNumber)}`;
            }
            const history = new history_1.HistoryBuyer();
            history.nomorTransaksi = nomorTransaksi;
            history.type = 'Go Ride';
            history.total = price;
            this.mainView.setHistory(history);
            this.mainView.show();
        });
    }
    getTransactionNumber(histories) {
        let rideHistory = 1;
        for (let i = 0; i < histories.length; i++) {
            if (histories[i].type == 'Go Ride') {
                rideHistory++;
            }
        }
        return rideHistory;
    }
}
exports.GoRideView = GoRideView;
