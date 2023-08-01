import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import swaggerOptions from "./core/swagger/swaggerConfig";
import UrlConstants from "./domain/constants/urlConstants/UrlConstants";
import bookRoutes from "./api/books/routes";
import userRoutes from "./api/users/routes";
dotenv.config();

const swaggerUi = require("swagger-ui-express");
const swaggerJsondoc = require("swagger-jsdoc");

const app = express();
const port = process.env.port || 8000;

const specs = swaggerJsondoc(swaggerOptions);
app.use(`${UrlConstants.baseEndpoint}${UrlConstants.swaggerEndpoint}`, swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));

app.get("/", (req, res) => {
  res.json({ message: `Hi There, From PORT ${port}!!` });
});

app.get(`${UrlConstants.baseEndpoint}`, (req, res) => {
  res.json({ message: "Welcome to Geekonomy-Project" });
});

app.use(`${UrlConstants.baseEndpoint}`, bookRoutes);
app.use(`${UrlConstants.baseEndpoint}`, userRoutes);

app.get("*", (req, res) => {
  res.status(404).send("Invalid Endpoint");
});

const appListenCallBack = () => {
  try {
    console.log("Server started on port " + port);
  } catch (error) {
    console.log("Server error on port " + port + " with error " + error);
  }
};

app.listen(port, appListenCallBack);

export default app;
