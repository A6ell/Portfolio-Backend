import express from "express";
import cors from "cors";

import moduleRoutes from "./routes.js";
import ConnectDb from "./dbConnection.js";

const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", moduleRoutes);

ConnectDb();

app.listen(3000, () => console.log("Example app listening on port 3000!"));
