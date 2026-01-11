let products = [];
let cart = [];

fetch("products.csv")
  .then(r => r.text())
  .then(text => {
    const lines = text.trim().split(/\r?\n/);
    for (let i = 1; i < lines.length; i++) {
      const [id, name, price, image] = lines[i].split(",");
      products.push({ name, price: Number(price), image });
    }
    showProducts(products);
  });

function showProducts(list) {
  const box = document.getElementById("product-list");
  box.innerHTML = "";
  list.forEach(p => {
    box.innerHTML += `
      <div class="product">
        <img src="images/${p.image}">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick='addToCart("${p.name}",${p.price})'>Add to Cart</button>
      </div>`;
  });
}

document.getElementById("search").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();
  showProducts(products.filter(p => p.name.toLowerCase().includes(val)));
});

function addToCart(name, price) {
  cart.push({ name, price });
  document.getElementById("cartCount").innerText = cart.length;
}

function openCart() {
  document.getElementById("cartBox").style.display = "block";
  renderCart();
}

function closeCart() {
  document.getElementById("cartBox").style.display = "none";
}

function renderCart() {
  let html = "";
  let total = 0;
  cart.forEach(i => {
    total += i.price;
    html += `<p>${i.name} - ₹${i.price}</p>`;
  });
  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("total").innerText = total;
}

function checkout() {
  let msg = "DK STORE Order:%0A";
  cart.forEach(i => msg += `${i.name} - ₹${i.price}%0A`);
  msg += "%0ADelivery within 5 KM only";
  window.open("https://wa.me/918171118308?text=" + msg);
}
