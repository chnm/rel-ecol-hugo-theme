import * as d3 from 'd3';
import DenominationsMap from './cities-map';

// Load the data
const urls = [
  'https://data.chnm.org/catholic-dioceses/',
  'https://data.chnm.org/ne/northamerica/'
];
const promises = [];
urls.forEach((url) => promises.push(d3.json(url)));

// Once all the data is loaded, initialize and render the visualizations
Promise.all(promises)
  .then((data) => {
    const chronoMap = new DenominationsMap(
      '#chrono-map',
      { dioceses: data[0], northamerica: data[1] },
      { width: 1000, height: 525 },
    );
    chronoMap.render();

    // Listen for changes to the slider
    d3.select('#year').on('input', function updateViz() {
      const year = this.valueAsNumber;
      chronoMap.update(year);
    });
  });
