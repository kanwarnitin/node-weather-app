console.log('Client side javascript file is loaded')
/*
fetch('http://localhost:3000/weather?place=Paris').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
*/
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const place = search.value
    console.log(place)

    if (!place) {
        console.log('Please enter a place name')
        messageOne.textContent = 'Please enter a place name'
        messageTwo.textContent = ''
    } else {
        messageOne.textContent = 'Searching ...'
        messageTwo.textContent = ''

        fetch('/weather?place='+place).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error)
                    messageOne.textContent = data.error
                    messageTwo.textContent = ''
                } else {
                    console.log(data.location)
                    console.log(data.forecast)
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    }



})