const toptext = document.getElementById("top");

  toptext.innerText = "1. Saveng: 1.000.000 coin\nNone\n\n\n\n\n\nCatatan: Jika kamu ingin masuk dalam Top Coin,\nKirim pesan ke Email saya ciliysunlight@gmail.com atau foxsaveng@gmail.com,\ndengan format:\n Nama: (Nama Kamu), (Hasil Screenshot Fight Kamu).";

 const veng = toptext.innerText;

 if (veng.addEventListner("click") === "click") { 
   veng.style.color = "red";
 }