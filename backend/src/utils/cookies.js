const setRefreshTokenCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: "/api/v1/auth/user/refresh",
  });
};

const clearRefreshTokenCookie = (res) => {
  res.clearCookie("refreshToken");
};

module.exports = { setRefreshTokenCookie, clearRefreshTokenCookie };
