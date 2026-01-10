let cart = [];

const productDiv = document.getElementById("products");

products.forEach(p => {
  productDiv.innerHTML += `
    <div class="product">
      <img src="${p.img}">
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

function openCart() {
  document.getElementById("cartModal").style.display = "block";
  showCart();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function showCart() {
  let cartItems = document.getElementById("cartItems");
  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach(i => {
    total += i.price;
    cartItems.innerHTML += `<p>${i.name} - ₹${i.price}</p>`;
  });

  document.getElementById("totalAmount").innerText = total;
}

function sendWhatsAppOrder() {
  let message = "Hello DK STORE 👋%0A%0ANew Grocery Order:%0A";
  let total = 0;

  cart.forEach(i => {
    message += `- ${i.name} ₹${i.price}%0A`;
    total += i.price;
  });

  message += `%0A Total: ₹${total}%0A%0ADelivery: Within 5 KM`;

  let url = "https://wa.me/918171118308?text=" + message;
  window.open(url, "_blank");
}
