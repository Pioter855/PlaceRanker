"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placesDto = void 0;
const joi_1 = __importDefault(require("joi"));
const placesDto = ({ body: { name, address, category, phoneNumber } }, res, next) => {
    const placesSchema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(255).required(),
        address: joi_1.default.string().required(),
        category: joi_1.default.string().required(),
        phoneNumber: joi_1.default.number().required(),
    });
    const { error } = placesSchema.validate({
        name,
        address,
        category,
        phoneNumber,
    });
    if (error) {
        res.status(400).send({ success: false, reason: error });
        return;
    }
    next();
};
exports.placesDto = placesDto;
