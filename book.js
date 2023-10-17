const addBookForm = document.getElementById("addBookForm");


// Add a book using the form.
addBookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const authString = document.getElementById('author').value

    const author = {
        first_name: authString.split(' ').slice(0, -1).join(' '),
        last_name: authString.split(' ').slice(-1).join(' ')
    }

    const book = {
        title: document.getElementById('title').value,
        isbn: document.getElementById('isbn').value,
        author: author,
        publication_year: parseInt(document.getElementById('publication_year').value),
        publisher: { publisher_name: document.getElementById('publisher').value },
        genre: { genre_name: document.getElementById('genre').value },
        price: document.getElementById('price').value,
        stock_quantity: parseInt(document.getElementById('stock_quantity').value),
    }

    const jsonData = JSON.stringify(book);

    const url = 'http://localhost:8080/books';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from the server:', data);
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
})


/**
 * Add another author to the form when the + button is clicked
*/
function addAuthor() {
    console.log("add author");
    const newAuthorInput = document.createElement("input");
    newAuthorInput.type = "text";
    newAuthorInput.name = "author";
    newAuthorInput.className = "form-control";
    newAuthorInput.required = true;

    const authorContainer = document.querySelector(".input-group");
    authorContainer.appendChild(newAuthorInput);
}


/**
 * Get the publisher data and load it into the data list
 */
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8080/publishers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(publishers => {
            populateDropdown('publisherList', publishers)


        })
        .catch(error => {
            console.error('Error fetching genre data:', error)
        })

})

/**
 * Get the genre data and load it into a data list
 */
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8080/genres', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(genres => {
            populateDropdown('genreList', genres)

        })
        .catch(error => {
            console.error('Error fetching genre data:', error)
        })

})

/**
 * populateGenreDropdown takes in a datalist id and a list of variables and populates the
 * data list with the variables
 * @param {*} list 
 */
function populateDropdown(dataListId, list) {
    const datalist = document.getElementById(dataListId)

    datalist.innerHTML = '';

    list.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        datalist.appendChild(option);
    });

}