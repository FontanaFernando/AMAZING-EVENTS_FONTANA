async function fetchApiTableEvents() {
    try {
        let data = await fetch(
            "https://mindhub-xj03.onrender.com/api/amazing?time=past"
        );
        data = await data.json();
        let events = data.events;

        const filteredEventsPast = events.filter(event => event.assistance);
        filteredEventsPast.map(event => {
            event.porcentajeAsistencia = event.assistance * 100 / event.capacity
            event.revenues = event.price * event.assistance
        })
        
        let eventHighestPercentage = [...events].sort((a, b) => a.capacity - b.capacity)

        let maxEventCapacity = eventHighestPercentage[eventHighestPercentage.length -1]

        let eventPercentage = [...filteredEventsPast].sort((a, b) => a.porcentajeAsistencia - b.porcentajeAsistencia)

        let maxEventPercentage = eventPercentage[eventPercentage.length -1]
        let minEventPercentage = eventPercentage[0]
        
        const tableEvents = document.getElementById("tableEvents")
        tableEvents.innerHTML += `
                                    <td>${maxEventPercentage.name} - ${maxEventPercentage.porcentajeAsistencia}</td>
                                    <td>${minEventPercentage.name} - ${minEventPercentage.porcentajeAsistencia}</td>
                                    <td>${maxEventCapacity.name} - ${maxEventCapacity.capacity} peoples</td>
                                `;
    }

    catch (error) {
        console.log("Error:", error);
    }
}

fetchApiTableEvents();

/*==============================================================================*/

async function fetchApiTableUpcoming() {
    try {
        const response = await fetch(
            "https://mindhub-xj03.onrender.com/api/amazing?time=upcoming"
        );
        let data = await response.json();
        let events = data.events;

        const filteredEventsUpcoming = events.filter(event => event.estimate);
        filteredEventsUpcoming.map(event => {
            event.porcentajeAsistencia = event.estimate * 100 / event.capacity
            event.revenues = event.price * event.estimate
        })
        let eventFilterCategory = [... new Set(filteredEventsUpcoming.map(event => event.category))]
        eventFilterCategory.forEach(category => {
            let capacity = 0
            let estimate = 0
            let revenues = 0
            filteredEventsUpcoming.forEach(event => {
                if (event.category == category){
                    capacity += event.capacity
                    estimate += event.estimate
                    revenues += event.revenues
                }})

                const tableUpcoming = document.getElementById("tableUpcoming")
                tableUpcoming.innerHTML += `
                                            <td>${category} </td>
                                            <td>${revenues}</td>
                                            <td>${(estimate * 100 / capacity).toFixed(2)}%</td>
                                            `;
    })
    } catch (error) {
        console.log("Error:", error);
    }
}

fetchApiTableUpcoming();

/*==============================================================================*/

async function fetchApiTablePast() {
    try {
        let data = await fetch(
            "https://mindhub-xj03.onrender.com/api/amazing?time=past"
        );
        data = await data.json();
        let events = data.events;

        const filteredEventsPast = events.filter(event => event.assistance);
        filteredEventsPast.map(event => {
            event.porcentajeAsistencia = event.assistance * 100 / event.capacity
            event.revenues = event.price * event.assistance
        })
        let eventFilterCategory = [... new Set(filteredEventsPast.map(event => event.category))]
        eventFilterCategory.forEach(category => {
            let capacity = 0
            let assistance = 0
            let revenues = 0
            filteredEventsPast.forEach(event => {
                if (event.category == category){
                    capacity += event.capacity
                    assistance += event.assistance
                    revenues += event.revenues
                }})
                const tablePast = document.getElementById("tablePast")
                tablePast.innerHTML += `
                                            <td>${category} </td>
                                            <td>${revenues}</td>
                                            <td>${(assistance * 100 / capacity).toFixed(2)}%</td>
                                    `;
    })
    } catch (error) {
        console.log("Error:", error);
    }
}

fetchApiTablePast();
