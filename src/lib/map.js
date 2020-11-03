import L from 'leaflet';

let map;

// Býr til popup á korti út frá geojson með content
export function createPopup(geojson, content) {
  // TODO
}

// Býr til Leaflet kort og setur miðju á (0, 0) í zoom level 2
export function init(el) {
  // TODO

  // Bætum við "tiles" frá OSM sem eru open source. Gætum líka
  // notað frá Google, mapbox eða fleirum en þyrftum þá aðgang
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);
}
