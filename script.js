let cart = [];

const productDiv = document.getElementById("products");

products.forEach(p => {
  productDiv.innerHTML += `
    <div class="product">
      <img src="./${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>

      <div class="qty">
        <button onclick="changeQty(${p.id}, -1)">−</button>
        <span id="qty-${p.id}">1</span>
        <button onclick="changeQty(${p.id}, 1)">+</button>
      </div>

      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `;
});

let quantities = {};

function changeQty(id, delta) {
  quantities[id] = (quantities[id] || 1) + delta;
  if (quantities[id] < 1) quantities[id] = 1;
  document.getElementById(`qty-${id}`).innerText = quantities[id];
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const qty = quantities[id] || 1;

  cart.push({ ...product, qty });
  document.getElementById("cartCount").innerText = cart.length;
}
