fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((res) => res.json())
    .then((data) => {
            const queryString = document.location.search
            const params = new URLSearchParams(queryString)
            const id = params.get('id')
            const event = data.events.find(event => event._id == id)
            const containerDetails = document.querySelector('.details')
            
            containerDetails.innerHTML = `<div class="card mb-3">
                                                <div class="row g-0">
                                                    <div class="col-md-4">
                                                        <img src="${event.image}" class="img-fluid rounded-start" alt="${event.name}">
                                                    </div>
                                                        <div class="col-md-8">
                                                            <div class="card-body">
                                                            <h5 class="card-title">${event.name}</h5>
                                                            <p class="card-text">${event.description}</p>
                                                            <p class="card-text">Fecha: ${event.date}.</p>
                                                            <p class="card-text">Ubicación: ${event.place}.</p>
                                                            <p class="card-text">Precio: ${event.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`
    })
    .catch((error) => console.error(error))

/* fetch('./JS/data.json')
    .then((res) => res.json())
    .then((data) => {
            const queryString = document.location.search
            const params = new URLSearchParams(queryString)
            const id = params.get('id')
            const event = data.events.find(event => event._id == id)
            const containerDetails = document.querySelector('.details')
            
            containerDetails.innerHTML = `<div class="card mb-3">
                                                <div class="row g-0">
                                                    <div class="col-md-4">
                                                        <img src="${event.image}" class="img-fluid rounded-start" alt="${event.name}">
                                                    </div>
                                                        <div class="col-md-8">
                                                            <div class="card-body">
                                                            <h5 class="card-title">${event.name}</h5>
                                                            <p class="card-text">${event.description}</p>
                                                            <p class="card-text">Fecha: ${event.date}.</p>
                                                            <p class="card-text">Ubicación: ${event.place}.</p>
                                                            <p class="card-text">Precio: ${event.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`
    })
    .catch((error) => console.error(error)) */