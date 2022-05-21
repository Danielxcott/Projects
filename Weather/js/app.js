let container = document.querySelector(".container");
let inputPart = container.querySelector(".input-part");
let infoTxt = inputPart.querySelector(".input-text");
let inputField = inputPart.querySelector("input");
let locationBtn = inputPart.querySelector("button");
let wIcon = container.querySelector(".weather-part img")
let backArrow = container.querySelector("header i")
let apiKey = "5701276a9398a92040240a2437ce1148";
let api;


inputField.addEventListener("keyup",(e)=>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value)
        setTimeout(()=>{
            inputField.value = "";
        },1000)
    }
})

function requestApi(city){
    api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}

function fetchData(){
    fetch(api)
    .then(res=>res.json())
    .then(json=>weatherDetails(json))
    infoTxt.innerText ="Getting weather details...";
    infoTxt.classList.add("pending")
}

function weatherDetails(info){
    if(info.cod == "404"){
    infoTxt.innerText = `${inputField.value} is not a valid city name`;
    infoTxt.classList.replace("pending","error")
    }else{
        setTimeout(()=>{
            infoTxt.classList.remove("pending");
            container.classList.add("active")
            //let's get required properties values in info obj
            let city = info.name;
            let country = info.sys.country;
            let {description , id} = info.weather[0];
            let {feels_like,humidity,temp} = info.main;
            //pass these value to a particular html element
            container.querySelector(".temp .numb").innerText=Math.floor(temp);
            container.querySelector(".weather").innerText = description;
            container.querySelector(".location span").innerText = `${city},${country}`;
            container.querySelector(".temp .numb-2").innerText=Math.floor(feels_like);
            container.querySelector(".humidity span").innerText = `${humidity}%`
            if(id == 800){
                wIcon.src = 'assets/Weather Icons/clear.svg'
            }else if(id >=200 && id <= 232){
                wIcon.src = 'assets/Weather Icons/storm.svg'
            }else if(id >= 300 && id <= 321){
                wIcon.src = 'assets/Weather Icons/drizzle.svg'
            }else if(id >= 500 && id<= 531){
                wIcon.src = 'assets/Weather Icons/rain.svg'
            }else if(id >= 600 && id<= 622){
                wIcon.src = 'assets/Weather Icons/snow.svg'
            }else if(id >= 701 && id<= 781){
                wIcon.src = 'assets/Weather Icons/haze.svg'
            }else if(id >= 801 && id<= 804){
                wIcon.src = 'assets/Weather Icons/cloud.svg'
            }
            console.log(info)
        },500)
       
    }
}

locationBtn.addEventListener("click",()=>{
    //to get where user is currently located
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError); 
    //if getCurrentPosition method is success then onsuccess function will run. If it's not, then onerror function will excute
    }else{
        alert("your browser doesn't support geolocation")
    }
})

function onSuccess(position){
    const {latitude , longitude} = position.coords //getting lat and long of the user device from coords obj
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}

function onError(error){
    infoTxt.innerText =error.message;
    infoTxt.classList.add("error")
}

backArrow.addEventListener("click",()=>{
    container.classList.remove("active")
})