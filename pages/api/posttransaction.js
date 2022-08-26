import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
const handler = async (req, res) => {
  if (req.body.STATUS == "TXN_SUCCESS") {
    await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(req.body) }
    );
  } else if (req.body.STATUS == "pending") {
    await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(req.body) }
    );
  }

  //order.findByIdAndUpdate(order._id);
  res.status(200).json({ body: req.body });
  //res.redirect("/order", 200);
};

export default connectDb(handler);
