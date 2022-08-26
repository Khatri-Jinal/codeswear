import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method === "POST") {
    let { name, email, password } = req.body;
    console.log("enc", CryptoJS.AES.encrypt(password, AES_SECRET).toString());

    let u = new User(
      //req.body
      {
        name,
        email,
        password: CryptoJS.AES.encrypt(password, AES_SECRET).toString(),
      }
    );
    await u.save();
    res.status(200).json({ success: "success" });
  } else {
    res.status(200).json({ success: "empty" });
  }
};

export default connectDb(handler);
