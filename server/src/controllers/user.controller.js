import { body, validationResult } from "express-validator";
import { getMe, loginUser, registerUser } from "../services/user.service.js";

const isProduction = process.env.NODE_ENV === "production";

export const validateRegister = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

export const validateLogin = [
  body("email").isEmail(),
  body("password").notEmpty(),
];

export const registerController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role } = req.body;
    const { accessToken, refreshToken, expiresIn } = await registerUser(
      name,
      email,
      password,
      role
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      maxAge: expiresIn * 1000,
      sameSite: isProduction ? "None" : "Lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: isProduction ? "None" : "Lax",
    });

    res.status(201).json({ accessToken, expiresIn });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const { accessToken, refreshToken, expiresIn } = await loginUser(
      email,
      password
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      maxAge: expiresIn * 1000,
      sameSite: isProduction ? "None" : "Lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: isProduction ? "None" : "Lax",
    });

    res.status(200).json({
      accessToken,
      expiresIn,
    });
  } catch (err) {
    next(err);
  }
};

export const meController = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    const { hasRefreshToken } = await getMe(accessToken, refreshToken);

    res.status(200).json({ hasRefreshToken });
  } catch (err) {
    res.status(401).json({ message: "Unable to get user info" });
  }
};
