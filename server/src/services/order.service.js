import orderModel from "../models/order.model.js";

class OrderService {
  async creatOrder(orderData) {
    const order = new orderModel(orderData);
    return await order.save();
  }

  async getAllOrders() {
    return await orderModel.find().sort({ createdAt: -1 });
  }

  async getOrderById(id) {
    return await orderModel.findById(id);
  }

  async getOrderByUserName(userName) {
    return await orderModel
      .find({ "user.name": userName })
      .sort({ createdAt: -1 });
  }
  async updateOrder(id, orderData) {
    return await orderModel.findByIdAndUpdate(id, orderData, { new: true });
  }

  async deleteOrder(id) {
    return await orderModel.findByIdAndDelete(id);
  }
}

export default new OrderService();
