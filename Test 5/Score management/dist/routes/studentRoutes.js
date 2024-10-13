"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const router = (0, express_1.Router)();
router.post("/register", studentController_1.register);
exports.default = router;
