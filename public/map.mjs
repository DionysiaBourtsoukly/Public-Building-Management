const mymap = L.map("leaflet").setView([38.246639,21.734573],15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(mymap);
const building1 = L.marker([38.245459,21.733246]).addTo(mymap).bindPopup('Κτήριο 1').openPopup();
console.log(L);

document.getElementById("leaflet").style.height = "85.5vh";

setTimeout(function () {
    window.dispatchEvent(new Event('resize'));
}, 1000);