import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import { GOOGLE_CLIENT_ID, JWT_SECRET } from "../const/const.js";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const loginGoogleUser = async (req, res) => {
  try {
    const { token } = req.body;

    console.log("token", token);

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    if (!email) {
      return res.status(400).json({ error: "Email not found in Google token" });
    }

    let user = await UserModel.findOne({ email });

     if (user) {
       return res
         .status(200)
         .json({ error: "User Already Exist" });
    }
    
    if (!user) {
      user = await UserModel.create({
        email,
        name, 
      });
    } else if (!user.name) {
      user.name = name;
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token: jwtToken,
      user,
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
