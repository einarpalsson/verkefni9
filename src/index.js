import { el, element, formatDate } from './lib/utils';
import { init, createPopup } from './lib/map';
import { fetchEarthquakes } from './lib/earthquakes';
// importa öðru sem þarf...

document.addEventListener('DOMContentLoaded', async () => {
  // Hér er allt „vírað“ saman
  const map = document.querySelector('.map');
  init(map);
 
  const createInfo = fetchEarthquakes();
});

