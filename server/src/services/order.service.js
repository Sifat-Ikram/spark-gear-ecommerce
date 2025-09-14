import mongoose from "mongoose";
import orderModel from "../models/order.model.js";
import Product from "../models/product.model.js";

class OrderService {
  async creatOrder(orderData) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      for (const item of orderData.cart) {
        const product = await Product.findOne({ sku: item.cart.sku }).session(
          session
        );

        if (!product) {
          throw new Error(`Product with SKU ${item.cart.sku} not found`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`${product.name} is not enough`);
        }
      }

      for (const item of orderData.cart) {
        const product = await Product.findOne({ sku: item.cart.sku }).session(
          session
        );
        product.stock -= item.quantity;

        await product.save({ session });
      }
      const order = new orderModel(orderData);
      await order.save({ session });

      await session.commitTransaction();
      session.endSession();

      return order;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
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

  async updateOrderStatus(id, status) {
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid order status");
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const order = await orderModel.findById(id).session(session);
      if (!order) {
        throw new Error("Order not found");
      }
      if (status === "cancelled" && order.status !== "cancelled") {
        for (const item of order.cart) {
          const product = await Product.findOne({ sku: item.cart.sku }).session(
            session
          );

          if (product) {
            product.stock += item.quantity;
            await product.save({ session });
          }
        }
      }

      order.status = status;
      await order.save({ session });

      await session.commitTransaction();
      session.endSession();

      return order;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  async getOrdersByStatus(status) {
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      throw new Error("Invalid order status");
    }
    return await orderModel.find({ status }).sort({ createdAt: -1 });
  }

  async deleteOrder(id) {
    return await orderModel.findByIdAndDelete(id);
  }
}

export default new OrderService();
