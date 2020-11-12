import { format } from 'date-fns';
import L, { marker } from 'leaflet';
import { init, createPopup } from './lib/map';
import { fetchEarthquakes } from './lib/earthquakes';
// importa öðru sem þarf...

document.addEventListener('DOMContentLoaded', async () => {
  // Hér er allt „vírað“ saman
  const map = document.querySelector('.map');
  const leafMap = init(map);

  function hideLoading() {
    const loading = document.querySelector('.loading');
    loading.remove();
  }

  function showData(data) {
    return data.forEach((location) => {
        const marker = createPopup(location);
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
          marker.openPopup();
        };
      });
  }

  fetchEarthquakes()
    .then((res) => {
      if (!res.ok) {
        throw new Error('None 200 status');
      } else {
        res.json()
          .then((data) => {
            showData(data.features);
            hideLoading();
          })
          .catch(() => {
            const errorMsg = '<p>Óvænt villa<p>';
            document.querySelector('.earthquakes').insertAdjacentHTML('afterbegin', errorMsg);
          });
      }
    });
});
