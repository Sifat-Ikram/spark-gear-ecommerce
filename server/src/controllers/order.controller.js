import orderService from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const order = await orderService.creatOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(201).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order for this id is not found!!!" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const order = await orderService.getOrderByUserName(username);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order for this user is not found!!!" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await orderService.updateOrder(req.params.id, req.body);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order for this id is not found!!!" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update only order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await orderService.updateOrderStatus(req.params.id, status);

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order for this id is not found!!!" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const orders = await orderService.getOrdersByStatus(status);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await orderService.deleteOrder(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order for this id is not found!!!" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
