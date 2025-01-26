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
      // User exists, send user info
      return res.status(200).json({
        message: "User already exists",
        token: jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" }),
        user: { email: user.email, name: user.name }, // Send user data including email
      });
    }

    // If user doesn't exist, create a new one
    user = await UserModel.create({
      email,
      name,
    });

    const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send user data including email on successful login
    res.status(200).json({
      message: "User logged in successfully",
      token: jwtToken,
      user: { email: user.email, name: user.name }, // Send email and name
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
