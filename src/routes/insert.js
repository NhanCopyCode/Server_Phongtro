import express from "express";
import * as insertController from "../controllers/insertController";

const insertRouter = express.Router();

insertRouter.post("/", insertController.insertData);
insertRouter.post("/pricesAndAcreage", insertController.insertPriceAndAcreage);

export default insertRouter;
