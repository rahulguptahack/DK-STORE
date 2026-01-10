let cart = [];

const productDiv = document.getElementById("products");

products.forEach(p => {
  productDiv.innerHTML += `
    <div class="product">
      <img src="./${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `;
});

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  document.getElementById("cartCount").innerText = cart.length;
}
