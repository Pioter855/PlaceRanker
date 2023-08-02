import * as http from "http";
import { AppDataSource } from "./config/data-source";

const port = 3000;
console.log("czesc");

const server = http.createServer((req: any, res: any) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!");
});

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.synchronize();
  })
  .then(() => {
    server.listen(port, () => {
      console.log(`Serwer działa na http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error(
      "Błąd podczas inicjowania lub synchronizacji bazy danych:",
      err,
    );
  });
