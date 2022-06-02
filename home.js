// Service worker
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => console.log("Registered service worker!"))
      .catch(() => console.log("Could not register service worker"));
  }
}
registerServiceWorker();
//
const snap = document.querySelector("#snap");
let notificationPermission = "";
let canvas = document.querySelector("#canvas");
const cameraButton = document.querySelector("#start-camera");
//måste ta in från local storage utifall det finns något där sedan innan
//annars skrivs det över så fort vi går in i home igen
const images = JSON.parse(localStorage.getItem("cameraApp"));
let stream;

let video = document.querySelector("#video");
// Starta camera per default, jag sätter ingen button med onclick för det
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
    video.play();
  });
}
// Här renderar jag ut min bild (canvas) när jag trycker på "Snap"
if (document.getElementById("snap")) {
  document.getElementById("snap").addEventListener("click", () => {
    let context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, 640, 480);
    console.log(notificationPermission);
    //Här har jag två CSS regler som reglerar om videon ska visas/bilden ska visas
    video.classList.toggle("hide");
    canvas.classList.toggle("show");
    if (
      notificationPermission === "granted" &&
      canvas.className.includes("show")
    ) {
      createNotification();
    }
  });
}
// Här har jag en onclick function som tar min bild och konverterar den till jpeg
// samt pushar upp det till min localstorage
snap.addEventListener("click", function () {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

  let image_data_url = canvas.toDataURL("image/jpeg"); // Konverterar till en JPEG bild

  images.push({
    id: images.length,
    image: image_data_url,
  });
  localStorage.setItem("cameraApp", JSON.stringify(images));
});
// Här har jag min notification function
function createNotification() {
  const text = "Your image has been saved to gallery!";
  const notification = new Notification("Notis", { body: text });
}

window.addEventListener("load", () => {
  Notification.requestPermission().then((permission) => {
    notificationPermission = permission;
  });
});
