"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const fetchInterval = Number(process.env.DATA_FETCH_INTERVAL) || 10000;
const fetchData = () => console.log('naak');
// Create interval to fetch data from API
setInterval(() => console.log('fetch data'), fetchInterval);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/vehicleposition', (req, res) => {
    res.send(db_1.default.vehicleposition);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
