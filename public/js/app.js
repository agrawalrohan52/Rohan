console.log('hi');




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    document.querySelector('input').value = search.defaultValue
    fetch('http://localhost:3000/weather?address='+location)
.then( response =>{
    response.json()
.then( data =>{
    if(data.error){
        console.log(data.error);
    } else{
        console.log(data.location);
        console.log(data.forecast);
        
        
    }
    })
    
})
    
})