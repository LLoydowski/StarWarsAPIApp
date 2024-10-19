const movieNames = {
    1: "A New Hope",
    2: "The Empire Strikes Back",
    3: "Return of the Jedi",
    4: "The Phantom Menace",
    5: "Attack of the Clones",
    6: "Revenge of the Sith"
}

let fetchType = "person"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById("search").addEventListener("keyup", (e) => {
    if(e.key == "Enter"){
        fetchData()
    }
})

document.getElementById("mobileBtn").addEventListener("click", (e) => {
    document.querySelector(".mobileBg").style.display = "flex"
})
document.querySelector(".mobileBg").addEventListener("click", async () => {
    await sleep(10)
    document.querySelector(".mobileBg").style.display = "none"
})

function fetchData(){
    switch(fetchType){
        case "person":
            fetchAndSearchPeople()
            break
        case "starship":
            fetchAndSearchStarship()
            break
    }
}

function switchView(view){
    document.querySelectorAll(".card").forEach(card => card.classList.add("hidden"))
    document.querySelectorAll(".poster").forEach(poster => poster.classList.add("disabled"))


    switch(view){
        case "person":
            document.querySelector(".person").classList.remove("hidden")
            fetchType = "person"

            document.getElementById("starshipModel").innerHTML = 'Model: '
            document.getElementById("starshipLength").innerHTML = 'Length: '
            document.getElementById("pilots").children[1].innerHTML = ''
            document.getElementById("starshipAppearances").children[1].innerHTML = ''

            break;
        case "starship":
            document.querySelector(".starship").classList.remove("hidden")
            fetchType = "starship"

            document.getElementById("sex").innerHTML = 'Sex: '
            document.getElementById("personHeight").innerHTML = 'Height: '
            document.getElementById("personWeight").innerHTML = 'Weight: '
            document.getElementById("vehicles").children[1].innerHTML = ''
            document.getElementById("personAppearances").children[1].innerHTML = ''

            break;
    }
}


async function fetchAndSearchPeople(){
    let loadingScreen = document.getElementById("loadingScreen")
    
    loadingScreen.classList.remove("disabled")

    let personNameInput = document.getElementById("search")
    let personName = personNameInput.value 
    
    personNameInput.blur()
    
    let response = await fetch("https://swapi.dev/api/people")
    .then(response => response.json())
    response = await Promise.resolve(response)
    let pages = Math.floor(response.count / 10) + 1



    for(let i = 1; i <= pages; i++){
        let page = await Promise.resolve(fetch(`https://swapi.dev/api/people/?page=${i}`)
        .then(response => response.json()))

        let people = page.results

        let person

        for(let j = 0; j < people.length; j++){
            if(people[j].name == personName){
                console.log("Found")
                person = people[j]
                break
            }
        }

        if(person){
            document.getElementById("search").value = ''
            // Name

            document.getElementById("personName").textContent = person.name

            // Basic Info

            document.getElementById("sex").textContent = `Sex: ${person.gender}`
            document.getElementById("personHeight").textContent = `Height: ${person.height} cm`
            document.getElementById("personWeight").textContent = `Weight: ${person.mass} kg`

            // Posters

            let posters = Array.from(document.querySelectorAll(".poster"))

            let moviesLinks = person.films
            let movies = []
            
            moviesLinks.forEach(link => {
                movies.push(link[link.length - 2])
            })
            
            posters.forEach(poster => {
                poster.classList.add("disabled")
                if(movies.includes(poster.getAttribute("posterID"))){
                    poster.classList.remove("disabled")
                }
            })
            
            // Appearances

            let appearances = document.getElementById("personAppearances").children[1]

            appearances.innerHTML = ""

            movies.forEach(movie => {
                appearances.innerHTML += `<li>${movieNames[movie]}</li>`
            })


            // Vehicles

            let vehiclesDiv = document.getElementById("vehicles").children[1]

            vehiclesDiv.innerHTML = ""

            let vehiclesList = []

            for(let j = 0; j < person.vehicles.length; j++){
                let data = await fetch(person.vehicles[j])
                let json = await data.json()
                let name = await json.name
                console.log(name)
                vehiclesList.push(name)
            }

            for(let j = 0; j < person.starships.length; j++){
                let data = await fetch(person.starships[j])
                let json = await data.json()
                let name = await json.name
                console.log(name)
                vehiclesList.push(name)
            }

            vehiclesList.forEach(element => {
                vehiclesDiv.innerHTML += `<li>${element}</li>`
            })

            break
        }
        if(i+1 > pages && !person){
            alert("Character wasn't found")
            break
        }
    }

    loadingScreen.classList.add("disabled")
}

async function fetchAndSearchStarship(){
    let loadingScreen = document.getElementById("loadingScreen")
    
    loadingScreen.classList.remove("disabled")

    let starshipNameInput = document.getElementById("search")
    let starshipName = starshipNameInput.value 
    
    starshipNameInput.blur()
    
    let response = await fetch("https://swapi.dev/api/starships")
    .then(response => response.json())
    response = await Promise.resolve(response)
    let pages = Math.floor(response.count / 10) + 1



    for(let i = 1; i <= pages; i++){
        let page = await Promise.resolve(fetch(`https://swapi.dev/api/starships/?page=${i}`)
        .then(response => response.json()))

        let starships = page.results

        let starship

        for(let j = 0; j < starships.length; j++){
            if(starships[j].name == starshipName){
                console.log("Found")
                starship = starships[j]
                break
            }
        }

        if(starship){
            document.getElementById("search").value = ''
            // Name

            document.getElementById("starshipName").textContent = starship.name

            // Basic Info

            document.getElementById("starshipModel").textContent = `Model: ${starship.model}`
            document.getElementById("starshipLength").textContent = `Length: ${starship.length} m`

            // Posters

            let posters = Array.from(document.querySelectorAll(".poster"))

            let moviesLinks = starship.films
            let movies = []
            
            moviesLinks.forEach(link => {
                movies.push(link[link.length - 2])
            })
            
            posters.forEach(poster => {
                poster.classList.add("disabled")
                if(movies.includes(poster.getAttribute("posterID"))){
                    poster.classList.remove("disabled")
                }
            })
            
            // Appearances

            let appearances = document.getElementById("starshipAppearances").children[1]

            appearances.innerHTML = ""

            movies.forEach(movie => {
                appearances.innerHTML += `<li>${movieNames[movie]}</li>`
            })


            // Pilots

            let pilotsDiv = document.getElementById("pilots").children[1]

            pilotsDiv.innerHTML = ""

            let pilotsList = []

            for(let j = 0; j < starship.pilots.length; j++){
                let data = await fetch(starship.pilots[j])
                let json = await data.json()
                let name = await json.name
                console.log(name)
                pilotsList.push(name)
            }

            pilotsList.forEach(element => {
                pilotsDiv.innerHTML += `<li>${element}</li>`
            })
            if(pilotsList.length == 0){
                pilotsDiv.innerHTML += `<li>This starship had no pilots!</li>`
            }
            break
        }
        if(i+1 > pages && !starship){
            alert("Starship wasn't found")
            break
        }
    }

    loadingScreen.classList.add("disabled")
}
