import ProductImageService from "../services/image.service.js";

export const addProductImages = async (req, res) => {
  const { id } = req.params;
  const { images } = req.body;
  try {
    const updatedProduct = await ProductImageService.addImages(id, images);
    res.status(200).json({
      message: "Images added successfully",
      images: updatedProduct.images,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
