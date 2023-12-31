import express from "express";
import * as userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/signup").post(userController.signUp);
userRouter.route("/login").post(userController.logIn);
userRouter.route("/verifyOTP").post(userController.verifyOTP)

export { userRouter };

