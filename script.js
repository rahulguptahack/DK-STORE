let products = [];
let cart = [];

fetch("products.csv")
  .then(r => r.text())
  .then(data => {
    const lines = data.trim().split(/\r?\n/);
    let categories = new Set();

    for (let i = 1; i < lines.length; i++) {
      let [id, name, category, price, image] = lines[i].split(",");
      products.push({ name, category, price: Number(price), image });
      categories.add(category);
    }

    let catSelect = document.getElementById("categoryFilter");
    categories.forEach(c => {
      catSelect.innerHTML += `<option value="${c}">${c}</option>`;
    });

    showProducts(products);
  });

function showProducts(list) {
  let box = document.getElementById("product-list");
  box.innerHTML = "";
  list.forEach(p => {
    box.innerHTML += `
      <div class="product">
        <img src="images/${p.image}">
        <h4>${p.name}</h4>
        <p>${p.category}</p>
        <p>₹${p.price}</p>
        <div class="qty">
          <button onclick='addToCart("${p.name}",${p.price},-1)'>–</button>
          <button onclick='addToCart("${p.name}",${p.price},1)'>+</button>
        </div>
      </div>`;
  });
}

document.getElementById("search").addEventListener("input", filterAll);
document.getElementById("categoryFilter").addEventListener("change", filterAll);

function filterAll() {
  let text = search.value.toLowerCase();
  let cat = categoryFilter.value;

  showProducts(products.filter(p =>
    p.name.toLowerCase().includes(text) &&
    (cat === "" || p.category === cat)
  ));
}

function addToCart(name, price, qty) {
  let item = cart.find(i => i.name === name);
  if (!item && qty > 0) cart.push({ name, price, qty: 1 });
  else if (item) {
    item.qty += qty;
    if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
  }
  document.getElementById("cartCount").innerText =
    cart.reduce((s, i) => s + i.qty, 0);
}

function openCart() {
  cartBox.style.display = "block";
  renderCart();
}

function closeCart() {
  cartBox.style.display = "none";
}

function renderCart() {
  let html = "";
  let total = 0;
  cart.forEach(i => {
    total += i.price * i.qty;
    html += `<p>${i.name} x ${i.qty} = ₹${i.price * i.qty}</p>`;
  });
  cartItems.innerHTML = html;
  total.innerText = total;
}

function checkout() {
  let name = custName.value;
  let address = custAddress.value;

  if (!name || !address) {
    alert("Enter name & address");
    return;
  }

  let msg = `DK STORE ORDER%0AName: ${name}%0AAddress: ${address}%0A%0A`;
  cart.forEach(i => msg += `${i.name} x ${i.qty} = ₹${i.price * i.qty}%0A`);
  msg += "%0ADelivery within 5 KM only";

  window.open("https://wa.me/918171118308?text=" + msg);
}
