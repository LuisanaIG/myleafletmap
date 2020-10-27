//Definir el mapa//
let mymap = L.map('mapid')

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
}).addTo(mymap);


//Poner más bonito los marcadores

let iconMarker = L.ExtraMarkers.icon({
	icon: 'far fa-star',
	markerColor: 'purple',
	shape: 'square',
	prefix: 'fa'
})


let geojson_url = "https://datos.alcobendas.org/dataset/aa3efc4c-e73a-46ca-933b-df501f6ad563/resource/725315ac-81ff-44ea-b3b4-56f56133fe86/download/esculturasarteenlaciudad.geojson"

//Usar fetch para capturar la información del geoJson//
fetch(
  geojson_url
).then(
  res => res.json()
).then(
  data => {
    let geojsonlayer = L.geoJson(data, {
			onEachFeature: function(feature, layer) {
				layer.bindPopup(feature.properties['Autor'])
				layer.setIcon(iconMarker)
			}
		}).addTo(mymap)
    mymap.fitBounds(geojsonlayer.getBounds())
  }
)
