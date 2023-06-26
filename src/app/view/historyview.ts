import { HistoryBuyer } from '../model/history';
import { MainView } from './mainview';

class HistoryView {

    constructor(private mainView : MainView){}
    
    show() : void {
        const histories : HistoryBuyer[] = this.mainView.getHistory();
        if(histories.length == 0){
            console.log('Anda tidak memiliki sejarah melakukan transaksi');
        }else{
            console.log('No. Nomor Transaksi Type Total');
			for(let i = 0; i < histories.length; i++) {
                const nomorTransaksi : string = histories[i].nomorTransaksi;
                const type : string = histories[i].type;
                const total : number = histories[i].total;
				console.log(`${(i+1)}. ${nomorTransaksi} ${type} Rp. ${total}`);
			}
        }
        this.mainView.show();
    }
}

export {HistoryView};