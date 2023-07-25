"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeGtfs = void 0;
const gtfs_realtime_bindings_1 = __importDefault(require("gtfs-realtime-bindings"));
const decodeGtfs = (buffer) => gtfs_realtime_bindings_1.default.transit_realtime.FeedMessage.decode(buffer);
exports.decodeGtfs = decodeGtfs;
