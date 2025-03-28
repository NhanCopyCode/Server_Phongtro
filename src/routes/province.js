import express from 'express'
import * as provinceController from '../controllers/provinceController';
const provinceRouter = express.Router();

provinceRouter.get("/", provinceController.getAllProvince);

export default provinceRouter;