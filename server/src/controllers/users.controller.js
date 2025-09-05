import UserServices from "../services/users.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await UserServices.getAllUsers();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserServices.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found!!!" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserServices.updateUser(id, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found!!!" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await UserServices.updateUserRole(id, role);
    if (!user) {
      return res.status(404).json({ message: "User not found!!!" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserServices.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
