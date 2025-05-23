const { verifyJWT } = require("./token");
const userModel = require("../modules/users/user.model");
const secureAPI =
  (roles = []) =>
  async (req, res, next) => {
    try {
      const { access_token } = req.headers;
      if (!access_token) throw new Error("Token Missing");
      if (roles.length === 0) next();
      else {
        const isValidToken = verifyJWT(access_token);
        const { data } = isValidToken;
        const { email } = data;
        const user = await userModel.findOne({
          email,
          isEmailVerified: true,
          isBlocked: false,
        });
        if (!user) throw new Error("Invalid user");
        const { roles: userRoles } = user;
        const isValidRole = userRoles.some((role) => roles.includes(role));
        if (!isValidRole) throw new Error("Access Denied.");
        req.currentUser = user?._id;
        next();
      }
    } catch (e) {
      e.toString().includes("Access Denied.")
        ? next({ err: e, status: "403" })
        : next({ err: e, status: "401" });
    }
  };
module.exports = { secureAPI };
