const cardsContainer = document.querySelector('.tarjetas')

cardsPrint (data, cardsContainer)

function cardsPrint(arrayData, container) {
    let cards = ''
    arrayData.events.forEach( event => cards += `
                <div>
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
                </div>
   `);
    container.innerHTML = cards
}

const inputsContainer = document.querySelector('.inputsCategory')

function filterCategory(arrayData, container) {
    const uniqueCategories = [...new Set(arrayData.events.map(event => event.category))];
    const inputs = uniqueCategories.map(category => `
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
            <label class="form-check-label" for="${category}">${category}</label>
        </div>
    `).join('');
    container.innerHTML = inputs;
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const checkedCategories = Array.from(checkboxes)
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);
            let filteredData;
            if (checkedCategories.length == 0) {
                filteredData = arrayData;
            } else {
                filteredData = {
                    events: arrayData.events.filter((event) =>
                        checkedCategories.includes(event.category)
                    ),
                };
            }
            cardsPrint(filteredData, cardsContainer);
        });
    });
}

const form = document.querySelector('form[role="search"]');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = form.querySelector('input[type="search"]').value.toLowerCase();
    const filteredData = {
        events: data.events.filter((event) =>
            event.name.toLowerCase().includes(searchTerm)
        ),
    };
        cardsPrint(filteredData, cardsContainer);
});

filterCategory(data, inputsContainer)