import { UserModel } from "../models/userModel.js";
import { generateOTP } from "../utils/generateOTP.js";

const signUp = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

const logIn = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await UserModel.findOne({ phoneNumber });
    if (user) {
      res.status(500).json({
        status: "ok",
        data: {
          userId: user._id,
        },
      });

    


    } else {
      res.status(400).json({
        status: "failed",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Error finding user",
    });
  }
};

export { signUp, logIn };
