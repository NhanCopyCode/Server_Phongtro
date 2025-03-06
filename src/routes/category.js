import express from "express";
import * as categoryController from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getCategories);

export default categoryRouter;
