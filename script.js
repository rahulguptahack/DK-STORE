fetch("products.csv")
  .then(res => res.text())
  .then(data => {
    const rows = data.split("\n").slice(1);
    const list = document.getElementById("product-list");

    rows.forEach(row => {
      if (!row.trim()) return;
      const [id, name, price, image] = row.split(",");

      const div = document.createElement("div");
      div.className = "product";

      div.innerHTML = `
        <img src="images/${image.trim()}">
        <h4>${name}</h4>
        <p>₹${price}</p>
        <a href="https://wa.me/918171118308?text=Order:%20${name}">
          <button>Order on WhatsApp</button>
        </a>
      `;

      list.appendChild(div);
    });
  });
