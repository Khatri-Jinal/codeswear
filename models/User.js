const mongoose = require("mongoose");
// async function main() {
//   await mongoose.connect("mongodb://localhost:27017/test");
// }

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);
