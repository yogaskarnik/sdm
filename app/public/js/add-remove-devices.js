document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await axios.get(
      'https://quality-of-service-on-demand.p-eu.rapidapi.com/sessions/657a7388-78c3-4d80-9d5a-045aa4ac5350',
      {
        headers: {
          'X-RapidAPI-Key':
            '4ed0e194d0mshff39531bdaec257p1136e1jsnd62933539b8d',
          'X-RapidAPI-Host': 'quality-of-service-on-demand.nokia.rapidapi.com',
        },
      }
    );
    console.log(`Get Session ${response.data}`);
    const deviceSessionData = document.getElementById('deviceSessionData');
    deviceSessionData.innerHTML = createTableFromObject(response.data);
  } catch (error) {
    console.error('Error fetching session data:', error);
  }

  const qosDemandForm = document.getElementById('qosDemandForm');

  qosDemandForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const phoneNumber = document.getElementById('phoneNumber').value;

    const options = {
      method: 'POST',
      url: 'https://quality-of-service-on-demand.p-eu.rapidapi.com/sessions',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '4ed0e194d0mshff39531bdaec257p1136e1jsnd62933539b8d',
        'X-RapidAPI-Host': 'quality-of-service-on-demand.nokia.rapidapi.com',
      },
      data: {
        qosProfile: 'QOS_L',
        device: {
          phoneNumber: '21431000030',
          ipv4Address: {
            publicAddress: '233.252.0.2',
            publicPort: 80,
          },
        },
        applicationServer: {
          ipv4Address: '233.252.0.2',
        },
        notificationUrl: 'https://example.com',
      },
    };

    try {
      const response = await axios.request(options);

      const tableContainer = document.getElementById('tableContainer');
      tableContainer.innerHTML = createTableFromObject(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  });
});

// Function to create a table from an object
function createTableFromObject(obj) {
  let tableHTML =
    '<table class="table table-bordered mt-3"><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>';
  for (const key in obj) {
    tableHTML += `<tr><td>${key}</td><td>${obj[key]}</td></tr>`;
  }
  tableHTML += '</tbody></table>';
  return tableHTML;
}

// Add event listener to the Add Device button
document
  .getElementById('addDeviceButton')
  .addEventListener('click', function () {
    document.getElementById('qosDemandForm').style.display = 'block';
  });
