function updateContent() {
  //Window page
  let page = window.location.hash.substr(1);
  if (page == "") page = "home";
  //Check whether the browser can use service-worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function () {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function () {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }
  //Request notification API
  if("Notification in window"){
    requestPermission();
    showNotifikasiRequireInteraction();
  } else {
    console.error("Browser tidak mendukung notifikasi.");
  }
  //Show sidenav
  updateNav();
  updatePage(page);
}

function updateNav() {
  //Call ajax request
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "nav.html");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Get elements nav
        document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
          elm.innerHTML = xhr.responseText;
        });
        //Get link elements nav
        document.querySelectorAll(".sidenav a, .topnav a").forEach((aElm) => {
          aElm.addEventListener("click", (e) => {
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();
            let page = e.target.getAttribute("href").substr(1);
            updatePage(page);
          });
        });
      }
    }
  };
  xhr.send();
}

function updatePage(page) {
  //Call ajax
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "pages/" + page + ".html");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      //Dom element
      const content = document.getElementById("body-content");
      if (xhr.status == 200) {
        content.innerHTML = xhr.responseText;
        if (page === "home") {
          M.AutoInit();
          getApi();
        }
        if(page === "favorit"){
          getSavedTeams();
        }
      } else if (xhr.status == 404) {
        content.innerHTML = "<p>Halaman tidak ditemukan</p>";
      } else {
        content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
      }
    }
  };
  xhr.send();
}

function requestPermission() {
  Notification.requestPermission().then(result => {
    if(result === 'denied'){
      console.log("Fitur notifikasi tidak di ijinkan");
      return;
    } else if(result === 'default'){
      console.error('Pengguna menutup kotak dialog permintaan ijin.');
      return;
    }
    if (('PushManager' in window)) {
      navigator.serviceWorker.getRegistration().then(function(registration) {
          registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array("BC8Bt4-Tti8a_d56kOC0G_VEQFMtjzI0GNRo_UBJfRpNFU1xQMp6Vn8Ybr-EA9_c1zzjwzRqyuB0tDPS35Lr3Cg")
            }).then(function(subscribe) {
              console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
              console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('p256dh')))));
              console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('auth')))));
          }).catch(function(e) {
              console.error('Tidak dapat melakukan subscribe ', e.message);
          });
      });
  }
  })
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function showNotifikasiRequireInteraction() {
  const title = 'Notifikasi yang meminta interaksi pengguna';
  const options = {
      requireInteraction: true,
  };
  if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(title, options);
      });
  } else {
      console.error('Fitur notifikasi tidak diijinkan.');
  }
}


//Init
document.addEventListener("DOMContentLoaded", updateContent);