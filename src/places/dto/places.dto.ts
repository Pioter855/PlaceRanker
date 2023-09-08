import Joi from "joi";
import { type IPlace } from "../../common/interfaces/places.interface";

export const placesDto = (
  { body: { name, address, category, phoneNumber } }: { body: IPlace },
  res: any,
  next: any,
) => {
  const placesSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    address: Joi.string().required(),
    category: Joi.string().required(),
    phoneNumber: Joi.number().required(),
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
