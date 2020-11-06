/**
 * Sækja gögn frá
 * https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
 * 
 * sér í lagi, alla jarðskjálfta 4,5+ seinustu 7 daga:
 * https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
 * 
 * Ath, í verkefni er afrit af gögnum í `./4.5_week.geojson`, gott
 * að nota það á meðan þróun stendur en skipta svo út.
 */

const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
// const URL = './4.5_week.geojson';

// let results;

// function showResults(results) {
//   const [{
//     mag,
//     place,
//     time,
//     updated,
//     tz,
//     url,
//     detail,
//     felt,
//     cdi,
//     mmi,
//     alert,
//     status,
//     tsunami,
//     sig,
//     net,
//     code,
//     ids,
//     sources,
//     types,
//     nst,
//     dmin,
//     rms,
//     gap,
//     magType,
//     type,
//     title
//         }] = results;

//     const element = 
//       el('li', 
//           el('div'),
//           el('h2', title),
//           el('dl'),
//           el('dt', 'Tími'),
//           el('dd', time),
//           el('dt', 'Styrkur'),
//           el('dd', mag)
//       );
// }

export async function fetchEarthquakes() {
  // TODO Sækja gögn frá URL, setja upp villumeðhöndlun og skila
  return fetch(`${URL}`)     
}
