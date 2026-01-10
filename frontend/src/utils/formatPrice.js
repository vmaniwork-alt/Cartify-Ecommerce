// FILE: frontend/src/utils/formatPrice.js

const formatPrice = (price) => {
  if (!price) return "₹0";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price);
};

export default formatPrice;
