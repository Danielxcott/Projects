let cp = document.querySelector(".current-place");
let allpath = document.querySelectorAll(".map path");
allpath.forEach(x=>{
    x.addEventListener("mouseover",_=>{
        cp.innerText = x.getAttribute("title");
    })
})