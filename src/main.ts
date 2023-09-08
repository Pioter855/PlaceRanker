import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./config/data-source";
import { placesDto } from "./places/dto/places.dto";
import { postPlaces } from "./places/places.service";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.synchronize();
  })
  .then(() => {
    app.post("/places", placesDto, postPlaces);
    app.listen(port, () => {
      console.log(`Serwer działa na http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error(
      "Błąd podczas inicjowania lub synchronizacji bazy danych:",
      err,
    );
  });
