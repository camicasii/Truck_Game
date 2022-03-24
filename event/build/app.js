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
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./models/User"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const event_1 = require("./event/event");
const ethers_1 = require("ethers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/user/:address', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { address } = req.params;
        const user = yield User_1.default.findOne({ address: address });
        if (user == null)
            return res.json({ address: "0" });
        else {
            console.log(user);
            const amount = ethers_1.utils.formatEther(ethers_1.BigNumber.from(user.BUSD));
            res.json({ user, amount });
        }
    });
});
app.get('/user/:address/w', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { address } = req.params;
        const user = yield User_1.default.findOne({ address: address });
        if (user == null)
            return res.json({ address: "0" });
        else {
            const amount = ethers_1.BigNumber.from(user.BUSD);
            console.log(amount);
            if (amount.isZero()) {
                console.log("is Zero");
                return res.json({ user: user.address, amount: 0 });
            }
            else
                (0, event_1.WithdrawHandle)(address, amount);
        }
    });
});
app.listen(5000, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb+srv://camicasii:159753@cluster0.e3btj.mongodb.net/myFirstDatabase", 
        //@ts-ignore
        { useNewUrlParser: true });
        yield (0, event_1.main)();
        console.log(`Server started and listening on port`);
    }
    catch (err) {
        console.log(`Error starting server: {err.message}`);
    }
}));
