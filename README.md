# 1Fi EMI App

A simple full-stack product and EMI plan application built as part of the 1Fi SDE1 assignment.

The application displays products with different variants and EMI plans. Product data, pricing, images, variants, and EMI plans are stored in MongoDB and retrieved through backend APIs.

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js
* Mongoose
* CORS

### Database

* MongoDB

## Features

* Dynamic product listing
* Product detail pages
* Unique URL for each product
* Multiple product variants
* Storage and color selection
* Variant-specific pricing and images
* Multiple EMI plans
* Monthly payment, tenure, interest rate and cashback information
* EMI plan selection
* Proceed with EMI confirmation
* Responsive user interface
* Product data loaded through backend APIs

## Project Structure

```text
1fi-emi-app/
│
├── backend/
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── src/
│   │   └── server.js
│   ├── seed.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## Database Schema

The application uses MongoDB with Mongoose.

### Product

```text
Product
├── name
├── slug
├── mrp
└── variants[]
    ├── storage
    ├── color
    ├── price
    ├── image
    └── emiPlans[]
        ├── monthlyPayment
        ├── tenure
        ├── interestRate
        └── cashback
```

Variants and EMI plans are embedded inside the product document.

## API Endpoints

### Get all products

```http
GET /api/products
```

Example:

```json
[
  {
    "_id": "product_id",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "mrp": 159900,
    "variants": []
  }
]
```

### Get a product by slug

```http
GET /api/products/:slug
```

Example:

```http
GET /api/products/iphone-17-pro
```

Example response:

```json
{
  "_id": "product_id",
  "name": "iPhone 17 Pro",
  "slug": "iphone-17-pro",
  "mrp": 159900,
  "variants": [
    {
      "storage": "256GB",
      "color": "Natural Titanium",
      "price": 129900,
      "image": "image_url",
      "emiPlans": [
        {
          "monthlyPayment": 4500,
          "tenure": 36,
          "interestRate": 0,
          "cashback": 3000
        }
      ]
    }
  ]
}
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/prakharv19/1fi-emi-app.git
cd 1fi-emi-app
```

### 2. Backend setup

Open a terminal inside the `backend` folder:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Seed the database

From the `backend` folder, run:

```bash
node seed.js
```

This adds the sample products, variants and EMI plans to MongoDB.

### 4. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the Vite development server, usually:

```text
http://localhost:5173
```

## Sample Products

The seed data contains three products:

* iPhone 17 Pro
* Samsung Galaxy S24 Ultra
* OnePlus 13

Each product contains multiple variants and EMI plans.

## Product URLs

Examples:

```text
/products/iphone-17-pro
/products/samsung-galaxy-s24-ultra
/products/oneplus-13
```

## Environment Variables

The backend requires:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

The `.env` file is intentionally excluded from Git using `.gitignore`.

## API Flow

```text
React Frontend
      ↓
Express REST API
      ↓
Mongoose
      ↓
MongoDB
```

Product and EMI data is fetched dynamically from MongoDB through the backend API rather than being hardcoded in the frontend.

## Assignment

This project was developed as part of the 1Fi SDE1 Assignment.
