const url = 
    'https://api.weatherapi.com/v1/current.json';

const apiKey =
    '88f0ae9234a7439f911134900241706';

//exemple of an url : https://api.weatherapi.com/v1/current.json?key=88f0ae9234a7439f911134900241706&q=london


$(document).ready(function () {
    displayInfo('hergla');
});

function getWeather() { 
    const country = $('#country-name').val();
    //Doing some form validation :

    if (!country) {
        alert('Please enter a country name.');
        return;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(country)) {
        alert('Please enter a valid country name.');
        return;
    }

    //If success :
    var myOffcanvas = document.getElementById('offcanvasRight');
    var bsOffcanvas = bootstrap.Offcanvas.getInstance(myOffcanvas); // Retrieve the offcanvas instance
    bsOffcanvas.hide();
    displayInfo(country);
}

async function displayInfo(country){
    const temp =
        `${url}?key=${apiKey}&q=${country}`
    
    try{
        const res = await fetch(temp);
        const data = await res.json();



        if(res.ok){
            console.log(data)
            console.log(data.current.temp_c)
            weatherShow(data);
        }
        else{
            alert('City not found . please try again')
        }
    }
    catch(error){
        console.error('Error fetching data : ',error)
    }
}


function weatherShow(data){
    $('#temperature').
        html(`${data.current.temp_c}°C`);
    $('#weather-icon').
        attr('src',data.current.condition.icon);
    $('#description').
        html(data.current.condition.text);
    $('#localtime').
        html(data.location.localtime);
    $('#region').
        html(`${data.location.name} : ${data.location.region} , ${data.location.country}`);
    $('#continent').
        html(data.location.tz_id);

    $('#humidity').
        html(`Humidity : ${data.current.humidity}`);
    $('#wind_direction').
        html(`Wind Direction : ${data.current.wind_dir}`);
    $('#wind_degree').
        html(`Wind degree : ${data.current.wind_degree}`);
    $('#pressure').
        html(`Pressure : ${data.current.pressure_in}`);
    $('#cloud').
        html(`Cloud : ${data.current.cloud}`);
    

}