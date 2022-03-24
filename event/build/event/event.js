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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.WithdrawHandle = void 0;
const ethers_1 = require("ethers");
const abi_1 = require("../utils/abi");
const User_1 = __importDefault(require("../models/User"));
const address = process.env.SWAP;
const ws_ = process.env.PRC_WS;
const RPC_ = process.env.PRC_HTTP;
//@ts-ignore
const MNEMONIC = process.env.MNEMONIC;
// const mysql = Pool();
function UserWithdraw(ws) {
    return __awaiter(this, void 0, void 0, function* () {
        const provider2 = new ethers_1.ethers.providers.JsonRpcProvider(RPC_);
        let wallet = ethers_1.ethers.Wallet.fromMnemonic(`${MNEMONIC}`);
        wallet = wallet.connect(ws);
        const walletOwner = wallet.connect(provider2);
        //@ts-ignore
        const contractnft = new ethers_1.ethers.Contract(address, abi_1.TruckGame, wallet);
        //@ts-ignore
        const contractHandle = new ethers_1.ethers.Contract(address, abi_1.TruckGame, walletOwner);
        contractnft.on("UserWithdraw", (user_, nonce, timestamp, amount, event) => __awaiter(this, void 0, void 0, function* () {
            console.log({
                user_,
                nonce,
                timestamp,
                amount,
            });
            // @ts-ignore
            const user = yield User_1.default.findOne({ address: user_ });
            const currenAmount = ethers_1.BigNumber.from(user.BUSD);
            if (currenAmount.isZero()) {
                console.log("is Zero");
                return;
            }
            else if (amount.gte(currenAmount)) {
                yield User_1.default.findOneAndUpdate({ address: user_ }, { BUSD: 0 });
                yield contractHandle.withdraw(user_, currenAmount, nonce);
            }
            else {
                const newAmount = currenAmount.sub(amount);
                yield User_1.default.findOneAndUpdate({ address: user_ }, { BUSD: newAmount.toHexString() });
                yield contractHandle.withdraw(user_, newAmount, nonce);
            }
        }));
    });
}
function UserExchange(ws) {
    return __awaiter(this, void 0, void 0, function* () {
        let wallet = ethers_1.ethers.Wallet.fromMnemonic(`${MNEMONIC}`);
        wallet = wallet.connect(ws);
        //@ts-ignore
        const contractnft = new ethers_1.ethers.Contract(address, abi_1.TruckGame, wallet);
        contractnft.on("UserExchange", (user_, amount_, nonce, timestamp, event) => __awaiter(this, void 0, void 0, function* () {
            console.log({
                user_,
                amount_: amount_.toHexString(),
                nonce: nonce.toString(),
                timestamp: timestamp.toString(),
            }, "UserExchange");
            // @ts-ignore
            const user = yield User_1.default.findOne({ address: user_ });
            if (user == null) {
                yield User_1.default.create({
                    address: user_,
                    nonce: nonce.toString(),
                    BUSD: amount_.toHexString(),
                    date: timestamp.toString(),
                });
            }
            else {
                console.log("paso");
                // console.log(user);
                const currenAmount = ethers_1.BigNumber.from(user.BUSD);
                yield User_1.default.findOneAndUpdate({ address: user_ }, { BUSD: amount_.add(currenAmount).toHexString() });
            }
        }));
    });
}
function Withdraw(ws) {
    return __awaiter(this, void 0, void 0, function* () {
        let wallet = ethers_1.ethers.Wallet.fromMnemonic(`${MNEMONIC}`);
        wallet = wallet.connect(ws);
        //@ts-ignore
        const contractnft = new ethers_1.ethers.Contract(address, abi_1.TruckGame, wallet);
        contractnft.on("Withdraw", (user_, amount_, nonce, timestamp, event) => __awaiter(this, void 0, void 0, function* () {
            console.log("withdraw");
            console.log({
                user_,
                amount_,
                nonce,
                timestamp,
            });
        }));
    });
}
function WithdrawHandle(user_, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const provider2 = new ethers_1.ethers.providers.JsonRpcProvider(RPC_);
        let wallet = ethers_1.ethers.Wallet.fromMnemonic(`${MNEMONIC}`);
        const walletOwner = wallet.connect(provider2);
        //@ts-ignore
        const contractHandle = new ethers_1.ethers.Contract(address, abi_1.TruckGame, walletOwner);
        // @ts-ignore
        const user = yield User_1.default.findOne({ address: user_ });
        const currenAmount = ethers_1.BigNumber.from(user.BUSD);
        if (amount.gte(currenAmount)) {
            yield User_1.default.findOneAndUpdate({ address: user_ }, { BUSD: 0 });
            yield contractHandle.withdraw(user_, currenAmount);
        }
        else {
            const newAmount = currenAmount.sub(amount);
            yield User_1.default.findOneAndUpdate({ address: user_ }, { BUSD: newAmount.toHexString() });
            yield contractHandle.withdraw(user_, newAmount);
        }
    });
}
exports.WithdrawHandle = WithdrawHandle;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const provider = new ethers_1.ethers.providers.WebSocketProvider(ws_);
        let wallet = ethers_1.ethers.Wallet.fromMnemonic(`${MNEMONIC}`);
        wallet = wallet.connect(provider);
        yield UserExchange(provider);
        yield UserWithdraw(provider);
        yield Withdraw(provider);
    });
}
exports.main = main;
// main();
