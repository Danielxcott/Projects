const form = document.querySelector("form");
const card = document.querySelector(".card")
    detail = card.querySelector(".details")
    img = card.querySelector("img.time")
    icon = card.querySelector(".icon img");

const updateCity = async (city) =>{
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    return {cityDets,weather};
}

const updateUi = (data) => {
    const weather = data.weather;
    const details = data.cityDets;
    const {EnglishName} = details;
    const {WeatherText,IsDayTime,WeatherIcon} = weather;
    const {Value} = weather.Temperature.Metric;

    detail.innerHTML = `<h5 class="my-3">${EnglishName}</h5>
    <div class="my-3">${WeatherText}</div>
    <div class="display-4 my-4">
      <span>${Value}</span>
      <span>&deg;C</span>
    </div>`;

    if(card.classList.contains("d-none"))
    {
        card.classList.remove("d-none");
    }
    let timeSrc = IsDayTime ?  `icons/day.svg` : `icons/night.svg`;
    img.setAttribute("src",timeSrc);
    const getIcon = `icons/${WeatherIcon}.svg`;
    icon.setAttribute("src",getIcon);
}

form.addEventListener("submit",e=>{
    e.preventDefault();
    const city = form.city.value.trim().toLowerCase();
    form.reset();
    sessionStorage.setItem("city",city);
    updateCity(city)
    .then(data=>{
       updateUi(data);
    })
    .catch(error=>{
        console.log(error);
    });
})

if(sessionStorage.getItem("city"))
{
    updateCity(sessionStorage.getItem("city"))
    .then(data=>{
       updateUi(data);
    })
    .catch(error=>{
        console.log(error);
    });
}