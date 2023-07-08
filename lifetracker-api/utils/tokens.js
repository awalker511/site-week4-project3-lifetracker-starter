const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { validateFields } = require("./validate");

//console.log("Sectrect key", SECRET_KEY.SECRET_KEY);

const generateToken = (data) =>
  jwt.sign(data, SECRET_KEY, {
    expiresIn: "4h",
  });

const createUserJwt = (user) => {
  validateFields({
    required: ["id", "email", "password"],
    obj: user,
    location: "token generation",
  });

  const payload = {
    id: user.id,
    email: user.email,
    password: user.password,
  };

  return generateToken(payload);
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("validateToken decoded", decoded);
    return decoded;
  } catch (err) {
    console.log("validateToken error", err);
  }
};

module.exports = {
  generateToken,
  validateToken,
  createUserJwt,
};
