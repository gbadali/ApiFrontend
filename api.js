const ListBooks = {
  Limit: 10,
  Offset: 0,
};

const table = document.querySelector('table');

// GET request to fetch JSON book list from back end
const request = fetch('http://localhost:8080/books/?page_id=1&page_size=10', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

document.addEventListener('DOMContentLoaded', function () {
  // JavaScript code to run after the page is fully loaded
  request
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      console.table(data[0]); // Handle the JSON data here
      console.log(data[0]);
      generateTable(table, data);
      generateTableHead(table, Object.keys(data[0]));
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
});



/**
 * Generate a table head using some data
 * @param {*} table the table dom node
 * @param {*} data the data to generate a table head with.
 */
function generateTableHead(table, data) {
  const thead = table.createTHead();
  const row = thead.insertRow();
  for (const key of data) {
    const th = document.createElement('th');
    const text = document.createTextNode(key);
    console.log(text);
    th.appendChild(text);
    row.appendChild(th);
  }
}

/**
 * Generate a table using some data
 * @param {*} table the table dom node
 * @param {*} data the data to put in the table
 */
function generateTable(table, data) {
  for (const element of data) {
    const row = table.insertRow();
    for (key in element) {
      if (Object.hasOwn(element, key)) {
        const cell = row.insertCell();
        const text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
}
