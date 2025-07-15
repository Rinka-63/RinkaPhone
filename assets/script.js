
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname;

  // ===============================
  // == Keranjang Belanja ==========
  // ===============================
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function changeQuantity(id, delta) {
    let cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.id !== id);
    }

    saveCart(cart);
    updateCartDisplay();
  }
  window.changeQuantity = changeQuantity;

  function addToCart(product) {
    let cart = getCart();
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    updateCartDisplay();
  }

  function animateFlyToCart(img) {
    const cartBtn = document.getElementById("cartButton");
    const imgRect = img.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();

    const clone = img.cloneNode(true);
    clone.classList.add("fly-img");
    Object.assign(clone.style, {
      position: "fixed",
      left: `${imgRect.left}px`,
      top: `${imgRect.top}px`,
      width: `${imgRect.width}px`,
      height: `${imgRect.height}px`,
      transition: "all 0.8s ease-in-out",
      zIndex: 9999,
    });
    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.left = `${cartRect.left + cartRect.width / 2 - 10}px`;
      clone.style.top = `${cartRect.top + cartRect.height / 2 - 10}px`;
      clone.style.width = "20px";
      clone.style.height = "20px";
      clone.style.opacity = "0.5";
    });

    setTimeout(() => clone.remove(), 800);
  }

  function updateCartDisplay() {
    const cart = getCart();
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const cartItemsContainer = document.getElementById("cartItems");

    if (cartCount) {
      cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    }

    if (cartTotal) {
      cartTotal.textContent =
        "Rp " +
        cart
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toLocaleString("id-ID");
    }

    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = "";
      const isOffcanvas = document
        .getElementById("cartOffcanvas")
        ?.classList.contains("show");

      if (cart.length === 0) {
        cartItemsContainer.innerHTML =
          "<p class='text-center'>Keranjang kosong.</p>";
        return;
      }

      cart.forEach((item) => {
        const div = document.createElement("div");
        div.className = "card mb-3";
        div.innerHTML = `
          <div class="row g-0 align-items-center">
            <div class="col-md-2">
              <img src="${item.img}" class="img-fluid rounded-start" alt="${
          item.name
        }">
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                ${
                  !isOffcanvas &&
                  !page.includes("cart.html") &&
                  !page.includes("co.html")
                    ? `<p class="card-text text-muted cart-item-desc">${
                        item.desc || ""
                      }</p>`
                    : ""
                }                
                <p class="card-text">Rp ${item.price.toLocaleString()} x ${
          item.quantity
        }</p>
              </div>
            </div>
            <div class="col-md-4 d-flex justify-content-end align-items-center pe-4">
              <button class="btn btn-sm btn-outline-secondary me-2" onclick="changeQuantity(${
                item.id
              }, -1)">-</button>
              <span>${item.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary ms-2" onclick="changeQuantity(${
                item.id
              }, 1)">+</button>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(div);
      });
    }
  }

  // ===============================
  // == Produk Detail ======
  // ===============================
  const products = [
    {
      id: 1,
      name: "IPhone 15 Pro",
      price: 20999000,
      img: "assets/ip.jpg",
      desc: `iPhone 15 Pro
            • Layar 6,1" Super Retina XDR
            • Chip A17 Pro (3nm)
            • Kamera 48 MP + Telefoto
            • Bodi Titanium (ringan & kuat)
            • Port USB-C, dukung transfer cepat
            • Action Button serbaguna
            • Tahan air IP68, Face ID
            • iOS 17 terbaru`,
    },
    {
      id: 2,
      name: "Laptop Ultra Tipis",
      price: 12499000,
      img: "assets/lp.jpg",
      desc: `Laptop Ultra Tipis
            • Layar 14" Full HD IPS
            • Desain tipis & ringan (1.2 kg)
            • Prosesor Intel Core i5 / Ryzen 5
            • RAM 8GB, SSD 512GB
            • Baterai tahan hingga 10 jam
            • Body aluminium elegan
            • Windows 11 Original
            • Cocok untuk kerja, kuliah, dan mobilitas tinggi`,
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 2499000,
      img: "assets/sm.jpg",
      desc: `Smartwatch Premium
              • Layar AMOLED 1,43” sentuh penuh
              • Desain elegan, frame metal
              • Monitoring detak jantung, oksigen & tidur
              • GPS & 100+ mode olahraga
              • Notifikasi WhatsApp & panggilan
              • Tahan air 5ATM
              • Baterai hingga 12 hari
              • Kompatibel Android & iOS`,
    },
    {
      id: 4,
      name: "Headphone Nirkabel",
      price: 3799000,
      img: "assets/hn.jpg",
      desc: `Headphone Nirkabel Bluetooth
              • Koneksi Bluetooth 5.3 stabil
              • Suara jernih dengan bass kuat
              • Desain over-ear nyaman dipakai lama
              • Mikrofon bawaan untuk panggilan
              • Kontrol sentuh untuk musik & volume
              • Baterai hingga 30 jam pemakaian
              • Pengisian cepat USB-C
              • Kompatibel Android, iOS, laptop`,
    },
    {
      id: 5,
      name: "Kamera Mirrorless",
      price: 24999000,
      img: "assets/km.jpg",
      desc: `Kamera Mirrorless Profesional 33MP
              • Sensor Full Frame 33MP
              • Video 4K 60fps & 10-bit recording
              • Layar sentuh flip, cocok untuk vlog
              • Real-time Eye AF (manusia & hewan)
              • IBIS 5-axis untuk stabilisasi maksimal
              • Dual slot SD + CFexpress
              • Body magnesium alloy tahan cuaca
              • WiFi, Bluetooth, & USB-C untuk transfer cepat
              • Ideal untuk fotografer & videografer profesional`,
    },
    {
      id: 6,
      name: "Speaker Bluetooth",
      price: 1599000,
      img: "assets/bl.jpg",
      desc: `Speaker Bluetooth Premium
              • Suara stereo jernih dengan bass kuat
              • Bluetooth 5.3 dengan jangkauan hingga 15 meter
              • Desain elegan & portabel
              • Tahan air IPX7 – aman di luar ruangan
              • Baterai tahan hingga 20 jam
              • Fitur pairing stereo (TWS)
              • Dukungan AUX, USB-C, dan microSD
              • Cocok untuk indoor & outdoor`,
    },
    {
      id: 7,
      name: "Drone Pro 4K",
      price: 8999000,
      img: "assets/dr.jpg",
      desc: `Drone Pro 4K
              • Kamera 4K UHD dengan gimbal 3-axis
              • Jarak kontrol hingga 8 km
              • Waktu terbang hingga 30 menit
              • GPS & GLONASS untuk stabilitas tinggi
              • Fitur Follow Me, Orbit Mode, Waypoint
              • Return to Home otomatis
              • Lipat ringkas & mudah dibawa
              • Cocok untuk videografi profesional & traveling`,
    },
    {
      id: 8,
      name: "Power Bank 20.000mAh",
      price: 499000,
      img: "assets/pb.jpg",
      desc: `Powerbank 20.000 mAh Fast Charging
              • Kapasitas besar 20.000 mAh
              • Fast charging 22.5W / PD 20W
              • 2 USB-A + 1 USB-C + Micro USB
              • Bisa isi 2–3 perangkat sekaligus
              • Layar digital indikator baterai
              • Perlindungan overcharge & suhu
              • Desain ramping, mudah dibawa
              • Cocok untuk smartphone, tablet, dan perangkat USB lainnya`,
    },
  ];

  window.showProductDetail = function (id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    document.getElementById("productDetailLabel").innerText = product.name;
    document.getElementById("productDetailBody").innerHTML = `
      <div class="col-md-6">
        <img src="${product.img}" alt="${
      product.name
    }" class="img-fluid" id="modalProductImage">
      </div>
      <div class="col-md-6">
        <h4>${product.name}</h4>
        <h5 class="text-success">${formatter.format(product.price)}</h5>
        <p>${product.desc.replace(/\n/g, "<br>")}</p>
        <button class="btn btn-primary" id="detailAddToCart">+ Keranjang</button>
      </div>
    `;

    setTimeout(() => {
      const addBtn = document.getElementById("detailAddToCart");
      const imgEl = document.getElementById("modalProductImage");
      addBtn.addEventListener("click", () => {
        addToCart(product);
        if (imgEl) animateFlyToCart(imgEl);
      });
    }, 100);

    const modal = new bootstrap.Modal(
      document.getElementById("productDetailModal")
    );
    modal.show();
  };

  // ===============================
  // == Cari Produk =====
  // ===============================
  const searchInput = document.querySelector(
    "input[placeholder='Cari produk...']"
  );
  const searchBtn = document.querySelector(".btn.btn-secondary");

  if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", () => {
      const keyword = searchInput.value.trim();
      if (keyword) {
        window.location.href = `produk.html?search=${encodeURIComponent(
          keyword
        )}`;
      } else {
        window.location.href = "produk.html";
      }
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
      }
    });
  }

  if (page.includes("produk.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get("search")?.toLowerCase();
    if (keyword) {
      const produkCards = document.querySelectorAll(".product-card");
      produkCards.forEach((card) => {
        const title = card
          .querySelector(".card-title")
          .textContent.toLowerCase();
        if (!title.includes(keyword)) {
          card.parentElement.style.display = "none";
        } else {
          card.parentElement.style.order = "-1";
        }
      });
    }
  }

  // ===============================
  // == Klik Keranjang Langsung==
  // ===============================
  if (
    page.includes("index.html") ||
    page.includes("produk.html") ||
    page === "/" ||
    page.endsWith("/produk.html")
  ) {
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const card = btn.closest(".product-card");
        const imgEl = card.querySelector("img");

        const product = {
          id: parseInt(btn.dataset.id),
          name: btn.dataset.name,
          price: parseInt(btn.dataset.price),
          img: btn.dataset.img || (imgEl ? imgEl.src : ""),
          desc:
            btn.dataset.desc ||
            card.querySelector(".card-text")?.textContent ||
            "",
        };

        const confirmed = confirm(`Tambahkan "${product.name}" ke keranjang?`);
        if (!confirmed) return;

        addToCart(product);
        if (imgEl) animateFlyToCart(imgEl);
      });
    });
  }


  // ===============================
  // == Tombol CO ============
  // ===============================
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const cart = getCart();
      if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
      }
      window.location.href = "co.html";
    });
  }

  // ===============================
  // == Kontak.html ============
  // ===============================
    const form = document.getElementById("kontakform");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name) {
          alert("Nama wajib diisi!");
          return;
        }
        if (!email) {
          alert("Email wajib diisi!");
          return;
        }
        if (!message) {
          alert("Pesan wajib diisi!");
          return;
        }

        alert("Pesan berhasil dikirim! Terima kasih telah menghubungi kami.");
        form.reset();
      });
    }



  // ===============================
  // == co.html ============
  // ===============================
  if (page.includes("co.html")) {
    const checkoutItems = document.getElementById("checkoutItems");
    const checkoutTotal = document.getElementById("checkoutTotal");
    const finishBtn = document.getElementById("finishCheckout");

    const cart = getCart();

    if (cart.length === 0) {
      checkoutItems.innerHTML =
        "<p class='text-center'>Keranjang belanja kosong.</p>";
      checkoutTotal.textContent = "Rp 0";
      finishBtn.style.display = "none";
      return;
    }

    let total = 0;
    cart.forEach((item) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const itemHTML = `
        <div class="card mb-3">
          <div class="row g-0 align-items-center">
            <div class="col-md-2">
              <img src="${item.img}" class="img-fluid rounded-start" alt="${
        item.name
      }">
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                ${
                  !page.includes("co.html") && item.desc
                    ? `<p class="card-text text-muted">${item.desc}</p>`
                    : ""
                }

                <p class="card-text">Rp ${item.price.toLocaleString(
                  "id-ID"
                )} x ${item.quantity}</p>
              </div>
            </div>
            <div class="col-4 col-md-3 text-end pe-2 pe-md-4">
              <h8>: Rp ${subtotal.toLocaleString("id-ID")}</h8>
            </div>
          </div>
        </div>
      `;

      checkoutItems.insertAdjacentHTML("beforeend", itemHTML);
    });

    checkoutTotal.textContent = "Rp " + total.toLocaleString("id-ID");

    finishBtn.addEventListener("click", () => {
      const nameInput = document.getElementById("buyerName");
      const phoneInput = document.getElementById("buyerPhone");
      const addressInput = document.getElementById("buyerAddress");

      let isValid = true;
      [nameInput, phoneInput, addressInput].forEach((input) =>
        input.classList.remove("is-invalid")
      );

      if (nameInput.value.trim() === "") {
        nameInput.classList.add("is-invalid");
        nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
        isValid = false;
      }
      if (phoneInput.value.trim() === "") {
        phoneInput.classList.add("is-invalid");
        phoneInput.scrollIntoView({ behavior: "smooth", block: "center" });
        isValid = false;
      }
      if (addressInput.value.trim() === "") {
        addressInput.classList.add("is-invalid");
        addressInput.scrollIntoView({ behavior: "smooth", block: "center" });
        isValid = false;
      }

      if (!isValid) return;

      localStorage.removeItem("cart");
      alert(
        `Selesaikan Proses Pembayaran dan Pesanan akan diproses.` 
        `Terima kasih sudah berbelanja di toko kami.`
      );
      window.location.href = "index.html";
    });
  }

  updateCartDisplay();
});

  document.getElementById("finishCheckout").addEventListener("click", function () {
    const method = document.getElementById("paymentMethod");
    const number = document.getElementById("paymentNumber");
    let valid = true;

    if (method.value === "") {
      method.classList.add("is-invalid");
      valid = false;
    } else {
      method.classList.remove("is-invalid");
    }

    if (number.value.trim() === "") {
      number.classList.add("is-invalid");
      valid = false;
    } else {
      number.classList.remove("is-invalid");
    }

    if (valid) {
      alert(
        "Pembayaran melalui: " + method.value + "\nNo Rekening/E-Wallet: " + number.value
      );
    }
  });
