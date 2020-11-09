import { format } from 'date-fns';
import L from 'leaflet';
import { init, createPopup } from './lib/map';
import { fetchEarthquakes } from './lib/earthquakes';
// importa öðru sem þarf...

document.addEventListener('DOMContentLoaded', async () => {
  // Hér er allt „vírað“ saman
  const map = document.querySelector('.map');
  const leafMap = init(map);

  fetchEarthquakes()
    .then((res) => {
      if (!res.ok) {
        throw new Error('None 200 status');
      } else {
        res.json()
          .then((data) => {
            data.features
              .forEach((location) => {
                createPopup(location);
                const output = `
                <li>
                  <div>
                    <h2>${location.properties.title}</h2>
                      <dl>
                        <dt>Tími</dt>
                        <dd>${format(location.properties.time, 'dd.MM.yyy kk:mm:ss')}</dd>
                        <dt>Styrkur</dt>
                        <dd>${location.properties.mag} á richter</dd>
                        <dt>Nánar</dt>
                        <dd>${location.properties.url}</dd>
                      </dl>
                      <div class="buttons">
                        <button class="${`location_${location.id}`}">Sjá á korti</button>
                        <a href="${location.properties.url}" target="_blank">Skoða nánar</a>
                      </div>
                  </div>
                </li>
                `;
                document.querySelector('.earthquakes').insertAdjacentHTML('afterbegin', output);
                const pinEl = document.querySelector(`.location_${location.id}`);
                pinEl.onclick = () => {
                  const c = location.geometry.coordinates;
                  const latlng = L.latLng(c[1], c[0]);
                  L.popup().setLatLng(latlng).setContent(
                    `
                    <h2>${location.properties.title}</h2>
                    <p>${format(location.properties.time, 'dd.MM.yyy kk:mm:ss')}</p>
                    <a href="${location.properties.url}" target="_blank">Skoða nánar</a>
                  `,
                  ).openOn(leafMap);
                };
              });
          });
      }
    });
});
