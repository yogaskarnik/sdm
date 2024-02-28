document.addEventListener('DOMContentLoaded', () => {
  const qosDemandForm = document.getElementById('qosDemandForm');

  qosDemandForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const phoneNumber = document.getElementById('phoneNumber').value;
    const qosProfile = document.getElementById('qosProfile').value;

    const options = {
      method: 'POST',
      url: 'https://quality-of-service-on-demand.p-eu.rapidapi.com/sessions',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '4ed0e194d0mshff39531bdaec257p1136e1jsnd62933539b8d',
        'X-RapidAPI-Host': 'quality-of-service-on-demand.nokia.rapidapi.com',
      },
      data: {
        qosProfile: qosProfile,
        device: {
          phoneNumber: phoneNumber,
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
      console.log(response.data);
      // Create table
      const table = document.createElement('table');
      table.classList.add('table', 'table-bordered', 'mt-3');

      // Create table header
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      for (const key in response.data) {
        const th = document.createElement('th');
        if (key === 'device') {
          th.textContent = key;
          tr.appendChild(th);
        } else if (key === 'applicationServer') {
          th.textContent = 'Application Server';
          tr.appendChild(th);
        } else if (key === 'qosStatus') {
          th.textContent = 'QoS Status';
          tr.appendChild(th);
        } else if (key === 'sessionId') {
          th.textContent = 'Session Id';
          tr.appendChild(th);
        }
      }
      thead.appendChild(tr);
      table.appendChild(thead);

      // Create table body
      const tbody = document.createElement('tbody');
      const trBody = document.createElement('tr');
      for (const key in response.data) {
        const td = document.createElement('td');
        if (key === 'device') {
          td.textContent = response.data.device.phoneNumber;
          trBody.appendChild(td);
        } else if (key === 'applicationServer') {
          td.textContent = response.data.applicationServer.ipv4Address;
          trBody.appendChild(td);
        } else if (key === 'qosStatus') {
          td.textContent = response.data.qosStatus;
          trBody.appendChild(td);
        } else if (key === 'sessionId') {
          td.textContent = response.data.sessionId;
          trBody.appendChild(td);
        }
      }
      tbody.appendChild(trBody);
      table.appendChild(tbody);

      // Append table to container
      tableContainer.innerHTML = '';
      tableContainer.appendChild(table);
    } catch (error) {
      console.error(error);
    }
  });
});
