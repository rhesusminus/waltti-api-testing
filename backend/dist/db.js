"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = [];
let vehicleposition;
const addItem = (item) => db.push(item);
const setVehiclePosition = (position) => (vehicleposition = position);
exports.default = { vehicleposition, setVehiclePosition };
