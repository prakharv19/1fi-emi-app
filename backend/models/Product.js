const mongoose = require("mongoose");

const emiPlanSchema = new mongoose.Schema({
  monthlyPayment: {
    type: Number,
    required: true,
  },
  tenure: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  cashback: {
    type: Number,
    default: 0,
  },
});

const variantSchema = new mongoose.Schema({
  storage: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  emiPlans: {
    type: [emiPlanSchema],
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    variants: {
      type: [variantSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);