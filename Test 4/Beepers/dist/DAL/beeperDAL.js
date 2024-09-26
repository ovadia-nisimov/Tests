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
exports.writeBeepers = exports.readBeepers = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const dataPath = path.join(__dirname, '../../data/beepers.json');
const readBeepers = async () => {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error("Error reading file:", error);
        return [];
    }
};
exports.readBeepers = readBeepers;
const writeBeepers = async (beepers) => {
    try {
        await fs.writeFile(dataPath, JSON.stringify(beepers, null, 2));
    }
    catch (error) {
        console.error("Error writing to file:", error);
    }
};
exports.writeBeepers = writeBeepers;
