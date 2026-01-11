let cart = [];
let quantities = {};

const productDiv = document.getElementById("products");

products.forEach(p => {
  productDiv.innerHTML += `
    <div class="product">
      <img src="${p.img}">
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
    let itemTotal = i.price * i.qty;
    total += itemTotal;
    cartItems.innerHTML += `<p>${i.name} × ${i.qty} = ₹${itemTotal}</p>`;
  });

  document.getElementById("totalAmount").innerText = total;
}

function sendWhatsAppOrder() {
  let name = custName.value;
  let address = custAddress.value;
  let phone = custPhone.value;

  let msg = `Hello DK STORE 👋%0A%0ANew Order:%0A`;
  let total = 0;

  cart.forEach(i => {
    let t = i.price * i.qty;
    total += t;
    msg += `- ${i.name} × ${i.qty} = ₹${t}%0A`;
  });

  msg += `%0ATotal: ₹${total}%0AName: ${name}%0AAddress: ${address}%0APhone: ${phone}%0ADelivery: 5 KM`;

  window.open("https://wa.me/918171118308?text=" + msg, "_blank");
}

function searchProduct() {
  let val = search.value.toLowerCase();
  document.querySelectorAll(".product").forEach(p => {
    p.style.display = p.innerText.toLowerCase().includes(val) ? "block" : "none";
  });
}
