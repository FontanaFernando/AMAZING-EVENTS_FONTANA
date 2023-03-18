fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        cardsPrint(data.events, cardsContainer, data.currentDate)
        filterCategory(data.events, inputsContainer)
        filterEvents(data.events, inputsContainer, cardsContainer, data.currentDate)
        searchEvents(data.events, form, cardsContainer, data.currentDate)
    })
    .catch((error) => console.error(error))

const cardsContainer = document.querySelector('.tarjetas')

function cardsPrint(arrayData, container, currentDate) {
    let cards = '';
        arrayData.filter(event => event.date <= currentDate)
        .forEach((event) => {
            cards += `<div>
            <div class="card" style="width: 18rem;">
                <img src="${event.image}" class="card-img-top" alt="${event.name}">
                <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                </div>
                <div class="btnPrice">
                <a href="./details.html?id=${event._id}" class="btn btn-primary">Details</a>
                <div>
                    <span>Price</span>
                    <span>${event.price}</span>
                </div>
                </div>
            </div>
            </div>`;
        });
        container.innerHTML = cards;
}

const inputsContainer = document.querySelector('.inputsCategory')

function filterCategory(arrayData, container) {
    const uniqueCategories = [...new Set(arrayData.map((event) => event.category))]
    const inputs = uniqueCategories.map((category) => `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
        <label class="form-check-label" for="${category}">${category}</label>
    </div>`
    ).join('')
    container.innerHTML = inputs
    }

function filterEvents(arrayData, container, cardsContainer, currentDate) {
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const checkedCategories = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
            if (checkedCategories.length > 0) {
            const filteredData = {
                events: arrayData.filter((event) => checkedCategories.includes(event.category)),
            };
            cardsPrint(filteredData.events, cardsContainer, currentDate);
            } else {
            cardsPrint(arrayData, cardsContainer, currentDate);
            }
        });
    });
}

const form = document.querySelector('.search-form')

function searchEvents(arrayData, form, cardsContainer, currentDate) {
    if (form && cardsContainer) {
        form.addEventListener('submit', (event) => {
        event.preventDefault()
        const searchTerm = form.querySelector('input[type="search"]').value.toLowerCase()
        const filteredData = {
            events: arrayData.filter((event) => event.name.toLowerCase().includes(searchTerm))
        }
        cardsPrint(filteredData.events, cardsContainer, currentDate)
        })
    }
}