import { Repository } from "typeorm";
import { IPlace } from "../common/interfaces/places.interface";
import { Places } from "./places.entity";
import { AppDataSource } from "../config/data-source";

export const postPlaces = async (
  { body: { name, address, category, phoneNumber } }: { body: IPlace },
  res: any,
) => {
  const placesRepository: Repository<Places> =
    AppDataSource.getRepository(Places);

  const placeWithName = await placesRepository.findOne({ where: { name } });
  if (!placeWithName) {
    try {
      const newPlace = placesRepository.create({
        name,
        address,
        category,
        phoneNumber,
      });

      await placesRepository.save(newPlace);

      res.status(200).send({
        success: true,
        data: { name, address, category, phoneNumber },
      });
      return;
    } catch (error) {
      res.status(500).send({ success: false, reason: "something went wrong" });
      return;
    }
  }
  res.status(400).send({ success: false, reason: "the name already exists" });
};
