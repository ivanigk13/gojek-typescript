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
exports.MainView = void 0;
const gofoodserviceimpl_1 = require("../serviceimpl/gofoodserviceimpl");
const gosendserviceimpl_1 = require("../serviceimpl/gosendserviceimpl");
const gorideserviceimpl_1 = require("../serviceimpl/gorideserviceimpl");
const gofoodview_1 = require("./gofoodview");
const gosendview_1 = require("./gosendview");
const gorideview_1 = require("./gorideview");
const historyview_1 = require("./historyview");
const scanner_1 = require("../util/scanner");
class MainView {
    constructor() {
        this.histories = [];
        this.goRideService = new gorideserviceimpl_1.GoRideServiceImpl();
        this.goSendService = new gosendserviceimpl_1.GoSendServiceImpl();
        this.goFoodService = new gofoodserviceimpl_1.GoFoodServiceImpl();
        this.goRideView = new gorideview_1.GoRideView(this, this.goRideService);
        this.goSendView = new gosendview_1.GoSendView(this, this.goSendService);
        this.goFoodView = new gofoodview_1.GoFoodView(this, this.goFoodService);
        this.historyView = new historyview_1.HistoryView(this);
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('=== Gojek App ===');
            console.log('1. Go-Ride');
            console.log('2. Go-Send');
            console.log('3. Go-Food');
            console.log('4. History');
            const choose = yield (0, scanner_1.askNumber)('Pilih [0 untuk keluar] >> ');
            switch (choose) {
                case 0:
                    scanner_1.sc.close();
                    break;
                case 1:
                    this.goRideView.show();
                    break;
                case 2:
                    this.goSendView.show();
                    break;
                case 3:
                    this.goFoodView.show();
                    break;
                case 4:
                    this.historyView.show();
                    break;
                default:
                    this.show();
                    break;
            }
        });
    }
    setHistory(history) {
        this.histories.push(history);
    }
    getHistory() {
        return this.histories;
    }
}
exports.MainView = MainView;
