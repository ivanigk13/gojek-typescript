"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryView = void 0;
class HistoryView {
    constructor(mainView) {
        this.mainView = mainView;
    }
    show() {
        const histories = this.mainView.getHistory();
        if (histories.length == 0) {
            console.log('Anda tidak memiliki sejarah melakukan transaksi');
        }
        else {
            console.log('No. Nomor Transaksi Type Total');
            for (let i = 0; i < histories.length; i++) {
                const nomorTransaksi = histories[i].nomorTransaksi;
                const type = histories[i].type;
                const total = histories[i].total;
                console.log(`${(i + 1)}. ${nomorTransaksi} ${type} Rp. ${total}`);
            }
        }
        this.mainView.show();
    }
}
exports.HistoryView = HistoryView;
