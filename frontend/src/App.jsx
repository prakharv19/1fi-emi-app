import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";

function ProductList({ products }) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
        1Fi EMI Store
      </h1>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-xl bg-white p-5 shadow-md"
          >
            <div className="mb-5 flex h-64 items-center justify-center rounded-lg bg-gray-100">
  <img
    src={product.variants[0].image}
    alt={product.name}
    className="h-full w-full object-contain p-4"
  />
</div>
            <h2 className="text-xl font-semibold text-gray-900">
              {product.name}
            </h2>

            <p className="mt-2 text-gray-500">
              MRP: ₹{product.mrp.toLocaleString("en-IN")}
            </p>

            <p className="mt-3 font-medium text-gray-700">
              Starting from ₹
              {Math.min(
                ...product.variants.map((variant) => variant.price)
              ).toLocaleString("en-IN")}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              {product.variants.length} variants ·{" "}
              {product.variants.reduce(
  (total, variant) => total + variant.emiPlans.length,
  0
)} EMI Plans
            </p>

            <Link
              to={`/products/${product.slug}`}
              className="mt-5 block w-full rounded-lg bg-black px-4 py-3 text-center font-medium text-white hover:bg-gray-800"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setSelectedVariant(data.variants[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product || product.message === "Product not found") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Product not found</h1>

        <Link
          to="/"
          className="mt-4 rounded-lg bg-black px-5 py-2 text-white"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedEmiPlan(null);
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-5 shadow-sm md:p-8">
        <Link
          to="/"
          className="text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Back to Products
        </Link>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="flex min-h-[350px] items-center justify-center rounded-2xl bg-gray-50 p-8">
            <img
  src={`${product.variants[0].image}?auto=format&fit=crop&w=600&q=80`}
  alt={product.name}
  className="h-full w-full object-contain p-4"
/>
          </div>

          {/* Product Information */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-gray-500">
              MRP: ₹{product.mrp.toLocaleString("en-IN")}
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              ₹{selectedVariant.price.toLocaleString("en-IN")}
            </p>

            {/* Storage */}
            <div className="mt-6">
              <p className="font-semibold text-gray-900">Storage</p>

              <div className="mt-3 flex gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant._id}
                    onClick={() => handleVariantChange(variant)}
                    className={`rounded-lg border px-4 py-2 ${
                      selectedVariant._id === variant._id
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    {variant.storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mt-6">
              <p className="font-semibold text-gray-900">Color</p>

              <p className="mt-2 text-gray-600">
                {selectedVariant.color}
              </p>
            </div>

            {/* EMI Plans */}
            <div className="mt-8">
              <p className="font-semibold text-gray-900">
                Choose an EMI Plan
              </p>

              <div className="mt-4 space-y-3">
                {selectedVariant.emiPlans.map((plan) => (
                  <button
                    key={plan._id}
                    onClick={() => {
                      setSelectedEmiPlan(plan);
                      setShowConfirmation(false);
                    }}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selectedEmiPlan?._id === plan._id
                        ? "border-black bg-gray-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          ₹
                          {plan.monthlyPayment.toLocaleString(
                            "en-IN"
                          )}
                          /month
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {plan.tenure} months · {plan.interestRate}%
                          interest
                        </p>
                      </div>

                      <p className="text-sm font-medium text-green-600">
                        ₹{plan.cashback.toLocaleString("en-IN")} cashback
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Proceed Button */}
            {selectedEmiPlan && (
              <button
                onClick={() => setShowConfirmation(true)}
                className="mt-6 w-full rounded-xl bg-black px-5 py-3.5 font-semibold text-white transition hover:bg-gray-800"
              >
                Proceed with EMI
              </button>
            )}

            {/* Confirmation */}
            {showConfirmation && (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  EMI Plan Selected
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {product.name} · {selectedVariant.storage} ·{" "}
                  {selectedVariant.color}
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  ₹
                  {selectedEmiPlan.monthlyPayment.toLocaleString(
                    "en-IN"
                  )}
                  /month
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {selectedEmiPlan.tenure} months ·{" "}
                  {selectedEmiPlan.interestRate}% interest
                </p>

                <p className="mt-2 text-sm font-medium text-green-700">
                  ₹
                  {selectedEmiPlan.cashback.toLocaleString(
                    "en-IN"
                  )}{" "}
                  cashback
                </p>

                <p className="mt-4 text-sm text-gray-600">
                  Your EMI plan has been selected successfully.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<ProductList products={products} />}
      />

      <Route
        path="/products/:slug"
        element={<ProductDetail />}
      />
    </Routes>
  );
}

export default App;