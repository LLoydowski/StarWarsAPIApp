const movieNames = {
    1: "A New Hope",
    2: "The Empire Strikes Back",
    3: "Return of the Jedi",
    4: "The Phantom Menace",
    5: "Attack of the Clones",
    6: "Revenge of the Sith"
}

document.getElementById("personSearch").addEventListener("keyup", (e) => {
    if(e.key == "Enter"){
        fetchAndSearchPeople()
    }
})

async function fetchAndSearchPeople(){
    let loadingScreen = document.getElementById("loadingScreen")

    loadingScreen.classList.remove("disabled")

    let response = await fetch("https://swapi.dev/api/people")
    .then(response => response.json())
    response = await Promise.resolve(response)
    let pages = Math.floor(response.count / 10) + 1

    let personName = document.getElementById("personSearch").value


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
    }

    loadingScreen.classList.add("disabled")
}
