"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const beeperStatus_1 = require("../enums/beeperStatus");
class Beeper {
    name;
    id;
    status;
    created_at;
    detonated_at;
    latitude;
    longitude;
    constructor(name) {
        this.name = name;
        this.id = Number(Math.random().toString().split(".")[1]);
        this.status = beeperStatus_1.BeeperStatus.Manufactured;
        this.created_at = new Date();
    }
}
exports.default = Beeper;
