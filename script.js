

async function fetchPeople(){
    let response = await fetch("https://swapi.dev/api/people")
    let data = await response.json()
    let results = data["results"]

    console.log(data)

    results.forEach(result => {
        console.log(result.name)
    })
}