import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app.js";

const dataBase = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(dataBase, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection SUCCESSFUL");
  })
  .catch((error) => {
    console.log("DB connection FAILED: ", error);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
