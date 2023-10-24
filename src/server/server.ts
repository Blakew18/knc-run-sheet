//NPM Imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { promisify } from "util";

//Local Imports
import {
  checkDBConnection,
  getOriginalPanelStock,
  updateCabinetVisionPanelStock,
} from "./mssql-querries";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//This sends a Get Request for all original materials.
app.get("/api/all-panel-stock", async (req, res) => {
  try {
    const list = await getOriginalPanelStock(
      req.query.dbPath,
      req.query.provider,
      req.query.arch
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

//This sends a Put Request to update material names
app.put("/api/all-panel-stock", async (req, res) => {
  try {
    await updateCabinetVisionPanelStock(
      req.body,
      req.query.dbPath,
      req.query.provider,
      req.query.arch
    );
    res.status(200).send("Materials Updated");
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/api/test", async (req, res) => {
  try {
    await checkDBConnection(req.body.path, req.body.provider, req.body.arch);
    res.status(200).send("Successfully Connected");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export const startExpressServer = async () => {
  const port = process.env.EXPRESSPORT;
  const listenAsync = promisify(app.listen).bind(app);
  await listenAsync(port);
  console.log(`Express Server Started on Port ${port}`);
  return;
};
