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
exports.getBeepersByStatus = exports.deleteBeeper = exports.updateBeeperStatus = exports.getBeeperById = exports.addBeeper = exports.getAllBeepers = exports.canUpdateStatus = void 0;
const beeperStatus_1 = require("../enums/beeperStatus");
const dal = __importStar(require("../DAL/beeperDAL"));
// פונקציה שבודקת האם הסטטוס מתקדם רק בכיוון אחד
const canUpdateStatus = (currentStatus, newStatus) => {
    const statusOrder = [
        beeperStatus_1.BeeperStatus.Manufactured,
        beeperStatus_1.BeeperStatus.Assembled,
        beeperStatus_1.BeeperStatus.Shipped,
        beeperStatus_1.BeeperStatus.Deployed,
        beeperStatus_1.BeeperStatus.Detonated
    ];
    const currentStatusIndex = statusOrder.indexOf(currentStatus);
    const newStatusIndex = statusOrder.indexOf(newStatus);
    return newStatusIndex > currentStatusIndex;
};
exports.canUpdateStatus = canUpdateStatus;
// קבלת כל הביפרים
const getAllBeepers = async () => {
    try {
        return await dal.readBeepers();
    }
    catch (error) {
        throw new Error('שגיאה בקבלת כל הביפרים: ' + error);
    }
};
exports.getAllBeepers = getAllBeepers;
// הוספת ביפר חדש
const addBeeper = async (beeper) => {
    try {
        const beepers = await dal.readBeepers();
        beepers.push(beeper);
        await dal.writeBeepers(beepers);
    }
    catch (error) {
        throw new Error('שגיאה בהוספת הביפר: ' + error);
    }
};
exports.addBeeper = addBeeper;
// קבלת ביפר לפי איי די
const getBeeperById = async (id) => {
    try {
        const beepers = await dal.readBeepers();
        return beepers.find(beeper => beeper.id === id);
    }
    catch (error) {
        throw new Error('שגיאה בקבלת הביפר לפי מזהה: ' + error);
    }
};
exports.getBeeperById = getBeeperById;
const startDetonationTimer = async (beepers, index) => {
    setTimeout(async () => {
        beepers[index].status = beeperStatus_1.BeeperStatus.Detonated;
        beepers[index].detonated_at = new Date();
        await dal.writeBeepers(beepers);
    }, 10000);
};
// עדכון סטטוס של ביפר לפי מזהה
const updateBeeperStatus = async (id, status, coordinates) => {
    try {
        const beepers = await dal.readBeepers();
        const index = beepers.findIndex(beeper => beeper.id === id);
        if (index !== -1) {
            const newStatus = status;
            const currentStatus = beepers[index].status;
            if ((0, exports.canUpdateStatus)(currentStatus, newStatus)) {
                if (newStatus === beeperStatus_1.BeeperStatus.Deployed) {
                    if (!coordinates?.latitude || !coordinates?.longitude) {
                        return 'Deployed דורש קואורדינטות';
                    }
                    // בדיקת טווח הקואורדינטות
                    const isLongitudeValid = coordinates.longitude >= 35.04438 && coordinates.longitude <= 36.59793;
                    const isLatitudeValid = coordinates.latitude >= 33.01048 && coordinates.latitude <= 34.6793;
                    if (!isLongitudeValid || !isLatitudeValid) {
                        return 'קואורדינטות צריכות להיות בטווח';
                    }
                    beepers[index].latitude = coordinates.latitude;
                    beepers[index].longitude = coordinates.longitude;
                    // התחלת טיימר
                    startDetonationTimer(beepers, index);
                }
                else if (newStatus === beeperStatus_1.BeeperStatus.Detonated) {
                    beepers[index].detonated_at = new Date();
                }
                // עדכון הסטטוס
                beepers[index].status = newStatus;
                await dal.writeBeepers(beepers);
                return true;
            }
            return false;
        }
        return false;
    }
    catch (error) {
        throw new Error('שגיאה בעדכון הסטטוס של הביפר: ' + error);
    }
};
exports.updateBeeperStatus = updateBeeperStatus;
// מחיקת ביפר לפי איי די
const deleteBeeper = async (id) => {
    try {
        let beepers = await dal.readBeepers();
        const initialLength = beepers.length;
        beepers = beepers.filter(beeper => beeper.id !== id);
        if (initialLength !== beepers.length) {
            await dal.writeBeepers(beepers);
            return true;
        }
        return false;
    }
    catch (error) {
        throw new Error('שגיאה במחיקת הביפר: ' + error);
    }
};
exports.deleteBeeper = deleteBeeper;
// קבלת ביפרים לפי סטטוס
const getBeepersByStatus = async (status) => {
    try {
        const beepers = await dal.readBeepers();
        return beepers.filter(beeper => beeper.status === status);
    }
    catch (error) {
        throw new Error('שגיאה בקבלת הביפרים ' + error);
    }
};
exports.getBeepersByStatus = getBeepersByStatus;
