import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

app.listen(3050, () => {
  console.log("Server Up");
});

app.use(cors());

export default app;
