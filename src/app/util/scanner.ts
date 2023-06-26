import * as r from 'readline';

const sc = r.createInterface({
    input : process.stdin,
    output : process.stdout
});

function askString(quest : string) {
    return new Promise<string>((resolve, reject) => {
        sc.question(quest, (input) => resolve(input) );
    });
}

function askNumber(quest : string) {
    return new Promise<number>((resolve, reject) => {
        askQuestion(quest, resolve);
    });
}

function askQuestion(quest : string, func : (inputNumber : number) => void) {
    sc.question(quest, (input) => {
        const inputNumber : number = Number(input);
        if(isNaN(inputNumber)){
            askQuestion(quest, func);
        }else{
            func(inputNumber);
        }
    } );
}


export{askString, askNumber, sc};