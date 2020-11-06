import { el, element, formatDate } from './lib/utils';
import { init, createPopup } from './lib/map';
import { fetchEarthquakes } from './lib/earthquakes';
// importa öðru sem þarf...

document.addEventListener('DOMContentLoaded', async () => {
  // Hér er allt „vírað“ saman
  let results;
  const map = document.querySelector('.map');
  init(map);


  function showResult(result) {
    const [{
      mag,
      place,
      time,
      updated,
      tz,
      url,
      detail,
      felt,
      cdi,
      mmi,
      alert,
      status,
      tsunami,
      sig,
      net,
      code,
      ids,
      sources,
      types,
      nst,
      dmin,
      rms,
      gap,
      magType,
      type,
      title
          }] = results;

    const element = 
      el('li', 
          el('div'),
          el('h2', title),
          el('dl'),
          el('dt', 'Tími'),
          el('dd', time),
          el('dt', 'Styrkur'),
          el('dd', mag)
      );

      results.appendChild(element);
  }

  fetchEarthquakes()
    .then((data) => {
      showResult(results.data);
    })
});

