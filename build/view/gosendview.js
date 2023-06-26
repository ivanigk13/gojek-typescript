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
exports.GoSendView = void 0;
const scanner_1 = require("../util/scanner");
const gosendserviceimpl_1 = require("../serviceimpl/gosendserviceimpl");
const goodtypes_1 = require("../constant/goodtypes");
const history_1 = require("../model/history");
class GoSendView {
    constructor(mainView, goSendService) {
        this.mainView = mainView;
        this.goSendService = goSendService;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            const from = yield (0, scanner_1.askString)('Input from: ');
            const to = yield (0, scanner_1.askString)('Input to: ');
            console.log('Jenis-jenis barang:');
            console.log(`- ${goodtypes_1.GoodTypes.DOKUMEN}`);
            console.log(`- ${goodtypes_1.GoodTypes.PECAH}`);
            console.log(`- ${goodtypes_1.GoodTypes.TIDAK_PECAH}`);
            const goodType = yield (0, scanner_1.askString)('Input Jenis Barang: ');
            const weight = yield (0, scanner_1.askNumber)('Berat: ');
            const receiver = yield (0, scanner_1.askString)('Receiver: ');
            this.goSendService = new gosendserviceimpl_1.GoSendServiceImpl();
            const price = this.goSendService.calculatePrice(from, to, weight);
            const driver = this.goSendService.findDriver();
            console.log('=== Order Detail ===');
            console.log('=== Driver ===');
            console.log(driver.driverName);
            console.log(driver.platNo);
            console.log(driver.telpNo);
            console.log('=== Item Detail ===');
            console.log(`Jenis Barang: ${goodType}`);
            console.log(`Berat Barang: ${weight}`);
            console.log(`Penerima: ${receiver}`);
            console.log(`Harga: ${price}`);
            const tempTransactionNumber = this.getTransactionNumber(this.mainView.getHistory());
            let nomorTransaksi = '';
            if (tempTransactionNumber < 10) {
                nomorTransaksi = `GS-0${String(tempTransactionNumber)}`;
            }
            else {
                nomorTransaksi = `GS-${+String(tempTransactionNumber)}`;
            }
            const history = new history_1.HistoryBuyer();
            history.nomorTransaksi = nomorTransaksi;
            history.type = 'Go Send';
            history.total = price;
            this.mainView.setHistory(history);
            this.mainView.show();
        });
    }
    getTransactionNumber(histories) {
        let rideHistory = 1;
        for (let i = 0; i < histories.length; i++) {
            if (histories[i].type == 'Go Send') {
                rideHistory++;
            }
        }
        return rideHistory;
    }
}
exports.GoSendView = GoSendView;
