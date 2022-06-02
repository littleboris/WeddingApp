const galleryElem = document.querySelector("#galleryImages");
const imgUrls = JSON.parse(localStorage.getItem("cameraApp"));

// loggar service worker status
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
updateUI();
// Här har jag skapat en function för update ui som kollar min localstorage
// samt mappar igenom elementen för att sedan kunna använda min remove function rätt
// alltså kunna ta bort bilder på det jag trycker på
function updateUI() {
  let imgUrls = JSON.parse(localStorage.getItem("cameraApp"));
  galleryElem.innerHTML = "";
  imgUrls.map((img) => {
    //skapar img-elementet
    let newImgElem = document.createElement("img");
    newImgElem.setAttribute("class", "galleryImages");
    newImgElem.setAttribute("src", img.image);
    //append lägger in elementet på sidan
    galleryElem.appendChild(newImgElem);

    //skapa span element
    let spanElem = document.createElement("span");
    spanElem.setAttribute("id", img.id);
    spanElem.setAttribute("class", "closewindow");
    spanElem.innerText = "X";
    spanElem.addEventListener("click", (e) => remove(e));
    galleryElem.appendChild(spanElem);
  });
}
// här har jag skapat en remove funktion för att kunna ta bort bilder
// från localstorage
function remove(e) {
  let imgUrls = JSON.parse(localStorage.getItem("cameraApp"));
  //parseInt gör om strängar till heltal
  let id = parseInt(e.target.id);

  const indexToRemove = imgUrls.findIndex((img) => img.id === id);
  if (indexToRemove !== -1) {
    imgUrls.splice(indexToRemove, 1);
    localStorage.setItem("cameraApp", JSON.stringify(imgUrls));
    updateUI();
  }
}
