const request = require('request');

const geocode = (address, callback) =>{
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibWlzaHJhNjQyMiIsImEiOiJjanpoMXFxeGQwYXhyM2tueDBoM2Q1bm5nIn0.RT4CoOAGEZ0vbZ0McF004w&limit=1'
    
    request({url:geocodeURL, json:true},(error,{ body }) =>{

        if (error) {
            callback('Unable to connect the weather services!',undefined)
        } else if (body.features.length === 0) {
            callback('Bad search! Please try with another city name!',undefined)
        } else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })

}

module.exports = geocode