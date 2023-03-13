var trafficel=document.getElementById("trafficDiv")
var trafficSub=document.getElementById("trafficSub")
var trafficstart=document.getElementById("start")
var trafficdest=document.getElementById("dest")
let startingAddress = document.getElementById("start") ;
let endingAddress = document.getElementById("dest") ;
let directionsEl = document.getElementById("directions")
const apikey =  'a81dcab2-4a5d-4d85-bd8c-f1056c905039';


async function getLongLat (address){
  const query = new URLSearchParams({
    q: address,
    locale: 'en',
    limit: '3',
    reverse: 'false',
    debug: 'false',
    provider: 'default',
    key: apikey
  }).toString();
  const resp = await fetch(
    `https://graphhopper.com/api/1/geocode?${query}`
  
  );
  
  const data = await resp.json();
    console.log("data:",data)  
    return {
    lat: data.hits[0].point.lat,
    lng: data.hits[0].point.lng
  }
}

async function getDirections (){

  // startingAddress = trafficstart.value;
  // endingAddress = trafficdest.value;
  console.log(startingAddress, endingAddress)

  const endLL = await getLongLat( endingAddress.value );
    const eLat = endLL.lat;
    const eLng = endLL.lng;

    const startLL = await getLongLat( startingAddress.value );
    const sLat = startLL.lat;
    const sLng = startLL.lng;
    

      const pointsArr = [
        `${sLat},${sLng}`,`${sLat},${sLng}`
      ]
    
    const queryString = `profile=car&point=${sLat},${sLng}&point=${eLat},${eLng}&key=a81dcab2-4a5d-4d85-bd8c-f1056c905039`
    
    const resp = await fetch(
      `https://graphhopper.com/api/1/route?${queryString}`
      
    ).catch(err=>console.error(err))
    
    const data = await resp.json(); //conerts string to json
    console.log("final:",data.paths[0].instructions    );
    let path = data.paths[0].instructions ;

    path.map(p => {
      let divEl = document.createElement("div");
      let wordsEl = document.createElement("p");
      wordsEl.textContent = p.text;
      let distEl = document.createElement("p");
      distEl.textContent = (p.distance / 1609.34).toFixed(2) + " mi";
      let timeEl = document.createElement("p");
      timeEl.textContent = Math.floor( (p.time/ 60) / 60) + " min";

      divEl.appendChild(wordsEl);
      divEl.appendChild(distEl);
      divEl.appendChild(timeEl);

      directionsEl.appendChild(divEl);

    })

 console.log(data)

return data
}
trafficSub.addEventListener("click",function(e){
  e.preventDefault();
  getDirections().then(res=>console.log(res)).catch(err=>console.error(err))
})

trafficstart.addEventListener("change",function(e){
console.log(e.target.value)
})