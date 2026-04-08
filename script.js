// LOGIN
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if(user === "admin" && pass === "123") {
    localStorage.setItem("login", "true");
    alert("Login berhasil!");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("notif").innerText = "Login gagal!";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("login");
  window.location.href = "login.html";
}

// CEK LOGIN
if(window.location.pathname.includes("dashboard.html")) {
  if(localStorage.getItem("login") !== "true") {
    window.location.href = "login.html";
  }
}

// ARTIKEL
function tambahArtikel() {
  let judul = document.getElementById("judul").value;
  let isi = document.getElementById("isi").value;

  let data = JSON.parse(localStorage.getItem("artikel")) || [];

  data.push({judul, isi});
  localStorage.setItem("artikel", JSON.stringify(data));

  alert("Artikel ditambahkan!");
  tampilAdmin();
}

// TAMPIL ADMIN
function tampilAdmin() {
  let data = JSON.parse(localStorage.getItem("artikel")) || [];
  let html = "";

  data.forEach((a, i) => {
    html += `
      <div class="card">
        <h4>${a.judul}</h4>
        <button onclick="hapus(${i})">Hapus</button>
      </div>
    `;
  });

  document.getElementById("listAdmin").innerHTML = html;
  document.getElementById("totalArtikel").innerText = data.length;
}

// HAPUS
function hapus(i) {
  let data = JSON.parse(localStorage.getItem("artikel"));
  data.splice(i,1);
  localStorage.setItem("artikel", JSON.stringify(data));
  tampilAdmin();
}

// TAMPIL USER
function tampilArtikel() {
  let data = JSON.parse(localStorage.getItem("artikel")) || [];
  let html = "";

  data.forEach(a => {
    html += `
      <div class="card">
        <h3>${a.judul}</h3>
        <p>${a.isi}</p>
      </div>
    `;
  });

  let el = document.getElementById("artikelList");
  if(el) el.innerHTML = html;
}

// SEARCH
function searchArtikel() {
  let keyword = document.getElementById("search").value.toLowerCase();
  let data = JSON.parse(localStorage.getItem("artikel")) || [];

  let hasil = data.filter(a => a.judul.toLowerCase().includes(keyword));

  let html = "";
  hasil.forEach(a => {
    html += `<div class="card"><h3>${a.judul}</h3></div>`;
  });

  document.getElementById("artikelList").innerHTML = html;
}

tampilArtikel();
if(document.getElementById("listAdmin")) tampilAdmin();