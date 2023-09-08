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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPlaces = void 0;
const places_entity_1 = require("./places.entity");
const data_source_1 = require("../config/data-source");
const postPlaces = ({ body: { name, address, category, phoneNumber } }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placesRepository = data_source_1.AppDataSource.getRepository(places_entity_1.Places);
    const placeWithName = yield placesRepository.findOne({ where: { name } });
    if (!placeWithName) {
        try {
            const newPlace = placesRepository.create({
                name,
                address,
                category,
                phoneNumber,
            });
            yield placesRepository.save(newPlace);
            res.status(200).send({
                success: true,
                data: { name, address, category, phoneNumber },
            });
            return;
        }
        catch (error) {
            res.status(500).send({ success: false, reason: "something went wrong" });
            return;
        }
    }
    res.status(400).send({ success: false, reason: "the name already exists" });
});
exports.postPlaces = postPlaces;
