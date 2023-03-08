
const cardsContainer = document.querySelector('.tarjetas')

cardsAlgo (data, cardsContainer)

function cardsAlgo(arrayData, container) {
let cards = ''
for (const event of arrayData.events) {
    cards += `<div>
                    <div class="card" style="width: 18rem;">
                        <img src="${event.image}" class="card-img-top" alt="${event.name}">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">${event.description}</p>
                        </div>
                        <div class="btnPrice">
                            <a href="./details.html" class="btn btn-primary">Details</a>
                            <div>
                                <span>Price</span>
                                <span>${event.price}</span>
                            </div>
                        </div>
                    </div>
                </div>`
}
container.innerHTML = cards    
}
