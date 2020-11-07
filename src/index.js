import { el, element, formatDate } from './lib/utils';
import { init, createPopup } from './lib/map';
import { fetchEarthquakes } from './lib/earthquakes';
import { parseJSON } from 'date-fns'
// importa öðru sem þarf...

document.addEventListener('DOMContentLoaded', async () => {
  // Hér er allt „vírað“ saman
  const map = document.querySelector('.map');
  init(map);

  fetchEarthquakes()
    .then((res) => {
      if (!res.ok) {
        throw new Error('None 200 status');
      } else {
        res.json()
          .then((data) => {
            createPopup(data, data.features.title)
            console.log(data.features);
            const html = data.features
              .map((user) => `
              <li>
                <div>
                  <h2>${user.properties.title}</h2>
                    <dl>
                      <dt>Tími</dt>
                      <dd>${parseJSON(user.properties.time)}</dd>
                      <dt>Styrkur</dt>
                      <dd>${user.properties.mag} á richter</dd>
                      <dt>Nánar</dt>
                      <dd>${user.properties.url}</dd>
                    </dl>
                    <div class="buttons">
                      <button>Sjá á korti</button>
                      <a href="${user.properties.url}" target="_blank">Skoða nánar</a>
                    </div>
                </div>
              </li>
              `)
              .join('');
            document.querySelector('.earthquakes').insertAdjacentHTML('afterbegin', html);
          })
      }
    });
});
