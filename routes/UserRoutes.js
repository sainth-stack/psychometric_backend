import express from "express";
import { createUser, fetchAllUsers, saveUserResults } from "../controllers/UserController.js";
import { loginGoogleUser } from "../controllers/GoogleLoginController.js";

const router = express.Router();

// Route to fetch all users
router.get("/", fetchAllUsers);

router.post("/google-login", loginGoogleUser);
router.post("/save-results", saveUserResults);


// Route to add a new user
router.post("/", createUser);

export default router;
