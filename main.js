//Make sure map loads first before map functions execute.
let coordinates = null;
window.onload = makeMap()

async function makeMap(){ 
        coordinates = await getLocation()
            let map = await L.map('map', {center: coordinates}).setView(coordinates, 13)
             await L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
             await L.marker(coordinates).addTo(map).bindPopup('Your location')
            .openPopup();   
     
}


async function getLocation() {
    if (navigator.geolocation) {
      let position = await new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject);
      })
     return [position.coords.latitude, position.coords.longitude]
    } else {
    console.log( "Geolocation is not supported by this browser.")
    }
}

 
const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq39nbZP5fazdLN8TFM5M+rrdV0uOq/lmbfhGYbdQYkR2k='
    }
};
  
let option = document.getElementById('desiredDestination');
let lat = 0;
let lon = 0;

async function getOption(){

    let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${option.value}%20&ll=${coordinates[0]}%2C${coordinates[1]}`, options)
    let responseJSON = await response.json()
    console.log(responseJSON)
    for(let i = 0; i < responseJSON.results.length; i++){
        lat = await responseJSON.results[i].geocodes.main.latitude
        lon = await responseJSON.results[i].geocodes.main.longitude 
        let businessCoords = [lat,lon] 
        console.log(businessCoords)
        //L.marker(businessCoords[i]).addTo(map) Cannot get this function to work.
    }
}





   



