const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    mrp: 159900,
    variants: [
      {
        storage: "256GB",
        color: "Natural Titanium",
        price: 129900,
        image:
          "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
        emiPlans: [
          {
            monthlyPayment: 5413,
            tenure: 24,
            interestRate: 0,
            cashback: 3000,
          },
          {
            monthlyPayment: 8125,
            tenure: 18,
            interestRate: 8.99,
            cashback: 2000,
          },
          {
            monthlyPayment: 10825,
            tenure: 12,
            interestRate: 12.99,
            cashback: 1000,
          },
        ],
      },
      {
        storage: "512GB",
        color: "Black Titanium",
        price: 149900,
        image:
          "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
        emiPlans: [
          {
            monthlyPayment: 6246,
            tenure: 24,
            interestRate: 0,
            cashback: 3500,
          },
          {
            monthlyPayment: 9083,
            tenure: 18,
            interestRate: 8.99,
            cashback: 2500,
          },
          {
            monthlyPayment: 12083,
            tenure: 12,
            interestRate: 12.99,
            cashback: 1500,
          },
        ],
      },
    ],
  },

  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    mrp: 139999,
    variants: [
      {
        storage: "256GB",
        color: "Titanium Gray",
        price: 119999,
        image:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
        emiPlans: [
          {
            monthlyPayment: 5000,
            tenure: 24,
            interestRate: 0,
            cashback: 2500,
          },
          {
            monthlyPayment: 7499,
            tenure: 18,
            interestRate: 8.99,
            cashback: 1500,
          },
          {
            monthlyPayment: 10899,
            tenure: 12,
            interestRate: 12.99,
            cashback: 1000,
          },
        ],
      },
      {
        storage: "512GB",
        color: "Titanium Black",
        price: 129999,
        image:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
        emiPlans: [
          {
            monthlyPayment: 5417,
            tenure: 24,
            interestRate: 0,
            cashback: 3000,
          },
          {
            monthlyPayment: 7850,
            tenure: 18,
            interestRate: 8.99,
            cashback: 2000,
          },
          {
            monthlyPayment: 11667,
            tenure: 12,
            interestRate: 12.99,
            cashback: 1200,
          },
        ],
      },
    ],
  },

  {
    name: "OnePlus 13",
    slug: "oneplus-13",
    mrp: 79999,
    variants: [
      {
        storage: "256GB",
        color: "Midnight Blue",
        price: 69999,
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        emiPlans: [
          {
            monthlyPayment: 2917,
            tenure: 24,
            interestRate: 0,
            cashback: 2000,
          },
          {
            monthlyPayment: 4375,
            tenure: 18,
            interestRate: 8.99,
            cashback: 1200,
          },
          {
            monthlyPayment: 6333,
            tenure: 12,
            interestRate: 12.99,
            cashback: 800,
          },
        ],
      },
      {
        storage: "512GB",
        color: "Arctic Dawn",
        price: 76999,
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
        emiPlans: [
          {
            monthlyPayment: 3208,
            tenure: 24,
            interestRate: 0,
            cashback: 2200,
          },
          {
            monthlyPayment: 4813,
            tenure: 18,
            interestRate: 8.99,
            cashback: 1400,
          },
          {
            monthlyPayment: 6917,
            tenure: 12,
            interestRate: 12.99,
            cashback: 900,
          },
        ],
      },
    ],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log("Products seeded successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seed failed:", error.message);
  }
}

seedDatabase();