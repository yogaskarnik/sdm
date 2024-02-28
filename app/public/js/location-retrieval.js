// Define custom marker icon URLs
const iconUrl =
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
const iconRetinaUrl =
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';

// Create custom marker icon
const customIcon = L.icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

let map; // Declare map variable globally to check if map is already initialized

function displayMap(latitude, longitude, addressName) {
  // Check if map is already initialized
  if (!map) {
    // If map is not initialized, create a new map instance
    map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  } else {
    // If map is already initialized, update the view to new coordinates
    map.setView([latitude, longitude], 13);
  }

  // Clear existing markers on the map
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Add marker for new coordinates
  L.marker([latitude, longitude], { icon: customIcon })
    .addTo(map)
    .bindPopup(addressName)
    .openPopup();
}

document.addEventListener('DOMContentLoaded', () => {
  const locationForm = document.getElementById('locationForm');
  if (locationForm) {
    locationForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const phoneNumber = document.getElementById('phoneNumber').value;
      console.log('Phone Number:', phoneNumber); // Debugging statement
      try {
        const options = {
          method: 'POST',
          url: 'https://location-retrieval.p-eu.rapidapi.com/retrieve',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key':
              '045a41f880msh934bba06750a7c5p137aadjsnd3cbc9a8e472',
            'X-RapidAPI-Host': 'location-retrieval.nokia.rapidapi.com',
          },
          data: {
            device: {
              phoneNumber: phoneNumber,
            },
            maxAge: '60',
          },
        };

        const response = await axios(options);
        console.log('Response:', response.data); // Debugging statement
        const latitude = response.data.area.center.latitude;
        const longitude = response.data.area.center.longitude;
        const addressName = response.data.civicAddress.A1;
        displayMap(latitude, longitude, addressName);
      } catch (error) {
        console.error('Error retrieving location:', error);
      }
    });
  }
});
