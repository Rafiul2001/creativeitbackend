const express = require("express");
const { ProductModel } = require("./db/product");
const { dbConnect } = require("./db/connection");

const PORT = 3000;
const app = express();
app.use(express.json());

app.get("/get-all", async (req, res) => {
  try {
    const allProducts = await ProductModel.find({});
    return res.status(200).json({
      data: allProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findOne({ _id: id }).lean();
    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/create", async (req, res) => {
  try {
    const { productName, quantity, price } = req.body;
    await ProductModel.create({
      productName,
      quantity,
      price,
    });
    return res.json({
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.deleteOne({ _id: id });
    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
