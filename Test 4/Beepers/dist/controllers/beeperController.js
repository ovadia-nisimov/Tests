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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBeepersByStatus = exports.deleteBeeper = exports.updateBeeperStatus = exports.getBeeperById = exports.createBeeper = exports.getBeepers = void 0;
const beeper_1 = __importDefault(require("../models/beeper"));
const beeperService = __importStar(require("../services/beeperService"));
// קבלת כל הביפרים
const getBeepers = async (req, res) => {
    try {
        const beepers = await beeperService.getAllBeepers();
        if (beepers.length === 0) {
            res.status(404).json({ message: 'לא נמצאו ביפרים' });
        }
        else {
            res.json(beepers);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'שגיאה בקבלת הביפרים', error });
    }
};
exports.getBeepers = getBeepers;
// יצירת ביפר חדש
const createBeeper = async (req, res) => {
    try {
        const { name } = req.body;
        const newBeeper = new beeper_1.default(name);
        await beeperService.addBeeper(newBeeper);
        res.status(201).json(newBeeper);
    }
    catch (error) {
        res.status(500).json({ message: 'שגיאה ביצירת הביפר', error });
    }
};
exports.createBeeper = createBeeper;
// קבלת ביפר לפי איי די
const getBeeperById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const beeper = await beeperService.getBeeperById(id);
        if (beeper) {
            res.json(beeper);
        }
        else {
            res.status(404).json({ message: 'ביפר לא נמצא' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'שגיאה בקבלת הביפר', error });
    }
};
exports.getBeeperById = getBeeperById;
// עדכון סטטוס של ביפר לפי איי די
const updateBeeperStatus = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { status, latitude, longitude } = req.body;
        const result = await beeperService.updateBeeperStatus(id, status, { latitude, longitude });
        if (typeof result === 'string') {
            res.status(400).json({ message: result });
        }
        else if (result) {
            res.json({ message: 'הסטטוס עודכן' });
        }
        else {
            res.status(404).json({ message: 'ביפר לא נמצא או שהסטטוס לא ניתן לעדכון' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'שגיאה בעדכון הסטטוס', error });
    }
};
exports.updateBeeperStatus = updateBeeperStatus;
// מחיקת ביפר לפי איי די
const deleteBeeper = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const success = await beeperService.deleteBeeper(id);
        if (success) {
            res.status(200).json({ message: 'הביפר נמחק בהצלחה' });
        }
        else {
            res.status(404).json({ message: 'ביפר לא נמצא' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'שגיאה במחיקת הביפר', error });
    }
};
exports.deleteBeeper = deleteBeeper;
// קבלת ביפרים לפי סטטוס
const getBeepersByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const beepers = await beeperService.getBeepersByStatus(status);
        if (beepers.length === 0) {
            res.status(404).json({ message: 'לא נמצאו ביפרים עם הסטטוס הזה' });
        }
        else {
            res.json(beepers);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'שגיאה בקבלת הביפרים לפי סטטוס', error });
    }
};
exports.getBeepersByStatus = getBeepersByStatus;
