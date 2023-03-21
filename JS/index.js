const cardsContainer = document.querySelector('.tarjetas');
const inputsContainer = document.querySelector('.inputsCategory');
const form = document.querySelector('.d-flex');

function cardsPrint(arrayData, container) {
    let cards = '';
    arrayData.forEach((event) => {
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
    if (arrayData.length === 0) {
        cards = '<h2 style="margin-top: 50px; height: 15vh; text-align: center;">No events found</h2>';
    }      
    container.innerHTML = cards;
}

function filterCategory(arrayData, container) {
    const uniqueCategories = [...new Set(arrayData.map((event) => event.category))];
    const inputs = uniqueCategories
        .map(
            (category) => `<div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
                                <label class="form-check-label" for="${category}">${category}</label>
                            </div>`
        )
        .join('');
    container.innerHTML = inputs;
}

function filterEvents(arrayData, container, cardsContainer) {
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
                cardsPrint(filteredData.events, cardsContainer);
            } else {
                cardsPrint(arrayData, cardsContainer);
            }
        });
    });
}

function searchEvents(arrayData, form, cardsContainer) {
    if (form && cardsContainer) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchTerm = form.querySelector('input[type="search"]').value.toLowerCase();
            const filteredData = {
                events: arrayData.filter((event) => event.name.toLowerCase().includes(searchTerm)),
            };
            cardsPrint(filteredData.events, cardsContainer);
            console.log(filteredData.events);
        });
    }
}

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        cardsPrint(data.events, cardsContainer);
        filterCategory(data.events, inputsContainer);
        filterEvents(data.events, inputsContainer, cardsContainer);
        searchEvents(data.events, form, cardsContainer);
    })
    .catch((error) => console.error(error));

/* fetch('./JS/data.json')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        cardsPrint(data.events, cardsContainer);
        filterCategory(data.events, inputsContainer);
        filterEvents(data.events, inputsContainer, cardsContainer);
        searchEvents(data.events, form, cardsContainer);
    })
    .catch((error) => console.error(error)) */