const request = require('request');

const forecast = (latitude,longitude, callback) =>{

    const url = 'https://api.darksky.net/forecast/08aef1b5809bc3e684ad99967d78e4b7/'+latitude+','+longitude

    request({url, json:true},(error,{ body }) =>{
            if(error){
                
                callback('Unable to connect to the weather services!',undefined)
                
            } else if (body.error) {
                
                callback('Unable to find the location!',undefined)
                
            } else{
            
            callback(undefined,body.daily.data[0].summary+' it is currently '+body.currently.temperature+ ' degree out'+' There is a '+body.currently.precipProbability+'% chance of rain')
            }
        })
}

module.exports = forecast