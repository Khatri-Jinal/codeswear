import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method === "POST") {
    let user = await User.findOne({ email: req.body.email });
    var bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
    if (user) {
      if (
        req.body.email === user.email &&
        req.body.password === bytes.toString(CryptoJS.enc.Utf8)
      ) {
        var token = jwt.sign(
          {
            name: user.name,
            email: user.email,
          },
          JWT_SECRET,
          { expiresIn: "2d" }
        );
        console.log("token is", token);
        res.status(200).json({ token: token, success: true });
      } else {
        res.status(500).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(500).json({ success: false, error: "user does not exists1" });
    }
  }
};

export default connectDb(handler);
