import express from "express";
const acreageRouter = express.Router();
import * as acreageController from "../controllers/acreageController";
acreageRouter.get("/", acreageController.getAllAcreages);
export default acreageRouter;
