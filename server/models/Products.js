const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Your product name is required"],
    },
    productCategory: {
      type: String,
      required: [true, "Your product category is required"],
    },
    productAmount: {
      type: Number,
      required: [true, "Your product amount is required"],
    },
    amountUnit: {
      type: String,
      required: [true, "Your amount unit is required"],
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Product", productSchema);