const loadProducts = () => {
  // const url = `https://fakestoreapi.com/products`;
  const url = `data/products.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="single-product mx-2 my-3">
        <div class="mb-2">
          <img class="product-image" src=${image}></img>
        </div>
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <h2>Price: $ ${product.price}</h2>
        <div class="d-flex justify-content-evenly mt-4">
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn">Add to cart</button>
          <button id="details-btn" class="btn">Details</button>
        </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

let getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  let converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  let total = convertedOldPrice + convertPrice;
  total = total.toFixed(2);
  document.getElementById(id).innerText = total;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  let priceConverted = getInputValue("price");
  console.log(priceConverted);

  if (priceConverted < 200) {
    priceConverted = priceConverted * 0.2;
    let priceValue = priceConverted.toFixed(2);

    setInnerText("delivery-charge", 10);
    setInnerText("total-tax", priceValue);
  }
  else if (priceConverted <= 400) {
    priceConverted = priceConverted * 0.3;
    let priceValue = priceConverted.toFixed(2);

    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceValue);
  }
  else if (priceConverted > 400) {
    priceConverted = priceConverted * 0.4;
    let priceValue = priceConverted.toFixed(2);

    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceValue);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  
  let totalString = grandTotal.toFixed(2);
  
  document.getElementById("total").innerText = totalString;
};

// Clear Button 
document.getElementById('clear-btn').addEventListener('click', function () {
  console.log(0);
  updateTotal()
});