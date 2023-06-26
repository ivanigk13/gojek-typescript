import { Driver } from '../model/driver';
import { GoSendService } from '../service/gosendservice';

class GoSendServiceImpl implements GoSendService {

    calculatePrice(from: string, to: string, weight: number): number {
        return (from.length + to.length)*2000 + (weight*100);
    }

    findDriver(): Driver {
        const driver : Driver = new Driver();
        driver.driverName = 'Driver 1';
        driver.platNo = 'B 1469 AUS';
        driver.telpNo = '08112235687';
        return driver;
    }

}

export {GoSendServiceImpl, GoSendService, Driver};