import { refreshAccessToken } from "../services/user.service.js";

const isProduction = process.env.NODE_ENV === "production";

export const refreshController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { accessToken, expiresIn } = await refreshAccessToken(refreshToken);

    // Update access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: expiresIn * 1000,
    });

    res.status(200).json({ accessToken, expiresIn });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const logoutController = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
