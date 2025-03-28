import express from "express";
import * as postController from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/", postController.getAllPost);
postRouter.get("/filter/:id", postController.getPostById);
postRouter.get("/limit", postController.getPostLimit);
postRouter.get("/newPost", postController.getNewPost);

export default postRouter;
