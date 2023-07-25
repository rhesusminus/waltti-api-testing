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
exports.getVehiclePosition = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const gtfs_realtime_bindings_1 = __importDefault(require("gtfs-realtime-bindings"));
const constants_1 = require("./constants");
const URL = process.env.API_URL || 'https://data.waltti.fi';
const authHeaders = {
    Authorization: `Authorization: Basic ${process.env.CLIENT_SECRET}`
};
const headers = Object.assign({}, authHeaders);
const getVehiclePosition = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, node_fetch_1.default)(`${URL}/${constants_1.CITIES.OULU}/api/gtfsrealtime/v1.0/feed/vehicleposition`, {
            method: 'GET',
            headers
        });
        if (!response.ok) {
            throw new Error(`${response.url}: ${response.status} ${response.statusText}`);
        }
        const buffer = yield response.arrayBuffer();
        const feed = gtfs_realtime_bindings_1.default.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
        feed.entity.forEach((entity) => {
            if (entity.tripUpdate) {
                console.log(entity.tripUpdate);
            }
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
exports.getVehiclePosition = getVehiclePosition;
