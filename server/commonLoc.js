// @change(getPlaceId)

function getPlaceId(locObj) {
  return locObj.place_id;
}

//get indiv latlong from api
function getLatLong(text) {
  url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";

  axios
    .get(url, {
      parameters: {
        input: text,
        inputtype: "textquery",
        key: "API key",
      },
    })
    .then((response) => {
      console.log(response.candidates[0].geometry);

      var obj = response.candidates[0].geometry;
      var lat = obj.location.lat;
      var long = obj.location.long;

      return { lat: lat, long: long };
    });
}

// iterates list of coords to return middle location api
function getMidCoord(coordList) {
  var latCount = 0;
  var longCount = 0;
  for (var coord of coordList) {
    latCount += coord.lat;
    longCount += coord.long;
  }

  var midLat = latCount / coordList.length;
  var midLong = longCount / coordList.length;

  return { lat: midLat, long: midLong };
}

// updates list of coords with new lat
function updateCoordList(text, coordList) {
  var newCoord = getLatLong(text);
  coordList.push(newCoord);

  return getMidCoord(coordList);
}

function getLocDetails(coordList) {
  var midCoord = getMidCoord(coordList);

  url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

  commonLocList = [];

  axios
    .get(url, {
      parameters: {
        location: `${midCoord.lat}, ${midCoord.long}`,
        rankby: "distance",
        key: "API key",
      },
    })
    .then((response) => {
      console.log(results);

      for (locObj of results) {
        if (locObj.opening_hours.open_now) {
          var coord = locObj.geometry.location;
          var name = locObj.name;
          var rating = locObj.rating;

          commonLocList.push({ coord: coord, name: name, rating: rating });
        }
      }

      return commonLocList;
    })
    .catch((error) => {
      console.error(error);
    });
}

// display map, centers map base on click of location
async function displayMap(coord) {
  const { Map } = await google.maps.importLibrary("maps");

  var lat = coord.lat;
  var long = coord.long;
  map = new Map(document.getElementById("map"), {
    center: { lat: lat, lng: long },
    zoom: 8,
  });
}

export {
  getPlaceId,
  getLatLong,
  getMidCoord,
  updateCoordList,
  getLocDetails,
  displayMap,
};

// (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
//   key: "YOUR_API_KEY",
//   v: "weekly",
//   // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
//   // Add other bootstrap parameters as needed, using camel case.
// });
