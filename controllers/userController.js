import { UserModel } from "../models/userModel.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendOTP } from "../utils/sendOTP.js";


const signUp = async (req, res) => {
  try {
    // const newUser = await UserModel.create(req.body); //self notes: This way anyone can register as an admin
    const newUser = await UserModel.create({
      name: req.body.name,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
    });
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
      const codeOTP = generateOTP();
      user.codeOTP = codeOTP;
      await user.save();
      await sendOTP(phoneNumber, codeOTP);
      res.status(201).json({
        status: "ok",
        codeOTP,
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
      message: `Error while LogIn ${error}`,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { codeOTP, userId } = req.body;
    const user = await UserModel.findById(userId);
    if (user) {
      if (user.codeOTP !== codeOTP) {
        res.status(400).json({
          status: "failed",
          message: "Incorrect code OTP",
        });
      } else {
        // TODO: CREATE TOKEN
        user.codeOTP = "";
        await user.save();

        res.status(201).json({
          type: "success",
          message: "OTP verified successfully",
          data: {
            token: "TEST TOKEN",
            userId: user._id,
          },
        });
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error while verifying OTP code ${error}`,
    });
  }
};

export { signUp, logIn, verifyOTP };
