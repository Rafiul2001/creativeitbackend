const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/ecommerce");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { dbConnect };
