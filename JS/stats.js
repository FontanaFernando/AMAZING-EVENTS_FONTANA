const tableContainer = document.querySelector('#tableContainer');

function filterEvents(arrayData) {
    let maxAssistanceEvent = null;
    let minAssistanceEvent = null;
    let maxCapacityEvent = null;

    arrayData.forEach((event) => {
        const percentage = (event.assistance / event.capacity) * 100;

        if (!maxAssistanceEvent || event.assistance > maxAssistanceEvent.assistance) {
            maxAssistanceEvent = event;
        }

        if (!minAssistanceEvent || event.assistance < minAssistanceEvent.assistance) {
            minAssistanceEvent = event;
        }

        if (!maxCapacityEvent || event.capacity > maxCapacityEvent.capacity) {
            maxCapacityEvent = event;
        }
    });

    return {
        maxAssistanceEvent,
        minAssistanceEvent,
        maxCapacityEvent,
    };
}

function tablePrint(arrayData, container) {
    let table = '';
    arrayData.forEach((event) => {
        table = `<table class="table">
                        <thead>
                            <tr>
                                <th colspan="3">Events Statistics</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Events with the highest percentage of attendance</th>
                                <th>Events with the lowest percentage of attendance</th>
                                <th>Events with larger capacity</th>
                            </tr>
                            <tr>
                                <td>${filterEvents(arrayData).maxAssistanceEvent.name}</td>
                                <td>${filterEvents(arrayData).minAssistanceEvent.name}</td>
                                <td>${filterEvents(arrayData).maxCapacityEvent.name}</td>
                            </tr>
                            <tr>
                                <th colspan="3">Upcoming events statistics by category</th>
                            </tr>
                            <tr>
                                <th>Categories</th>
                                <th>Revenues</th>
                                <th>Percentage of attendance</th>
                            </tr>
                            <tr>
                                <td>data4</td>
                                <td>data5</td>
                                <td>data6</td>
                            </tr>
                            <tr>
                                <th colspan="3">Past events statistics by category</th>
                            </tr>
                            <tr>
                                <th>Categories</th>
                                <th>Revenues</th>
                                <th>Percentage of attendance</th>
                            </tr>
                            <tr>
                                <td>data13</td>
                                <td>data14</td>
                                <td>data15</td>
                            </tr>

                        </tbody>
                    </table>`;
    });
    container.innerHTML = table;
}

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        tablePrint(data.events, tableContainer);
        filterEvents(data.events)
    })
    .catch((error) => console.error(error))

/* fetch('./JS/data.json')
.then((res) => res.json())
.then((data) => {
    console.log(data)
    tablePrint(data.events, tableContainer);
})
.catch((error) => console.error(error)) */