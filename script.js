

function testAPI(){
    fetch("https://swapi.dev/api/people")
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}