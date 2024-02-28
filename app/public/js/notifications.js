document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await axios.get(
      'https://device-status.p-eu.rapidapi.com/event-subscriptions/058dceff-6b52-4d22-9b9f-5d5b0c6000f0',
      {
        headers: {
          'X-RapidAPI-Key':
            '4ed0e194d0mshff39531bdaec257p1136e1jsnd62933539b8d',
          'X-RapidAPI-Host': 'device-status.nokia.rapidapi.com',
        },
      }
    );
    console.log(`notificationData ${response}`);
    const notificationData = document.getElementById('notificationData');
    notificationData.innerHTML = createTableFromObject(response.data);
  } catch (error) {
    console.error('Error fetching notification data:', error);
  }
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
