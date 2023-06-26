"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sc = exports.askNumber = exports.askString = void 0;
const r = __importStar(require("readline"));
const sc = r.createInterface({
    input: process.stdin,
    output: process.stdout
});
exports.sc = sc;
function askString(quest) {
    return new Promise((resolve, reject) => {
        sc.question(quest, (input) => resolve(input));
    });
}
exports.askString = askString;
function askNumber(quest) {
    return new Promise((resolve, reject) => {
        askQuestion(quest, resolve);
    });
}
exports.askNumber = askNumber;
function askQuestion(quest, func) {
    sc.question(quest, (input) => {
        const inputNumber = Number(input);
        if (isNaN(inputNumber)) {
            askQuestion(quest, func);
        }
        else {
            func(inputNumber);
        }
    });
}
