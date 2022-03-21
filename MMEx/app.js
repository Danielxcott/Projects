let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result")
let btn = document.getElementById("calc")
let table = document.getElementById("tbody")

function calc(x,y,z){
    let o = document.createElement("option");
    let c = document.createTextNode(y);
    o.setAttribute("value",toNum(z));
    o.appendChild(c);
    x.appendChild(o);
}

function toNum(x){
    return Number(x.replace(",","")) ;
}
function addtotr(x){
    let row = document.getElementById("rowspacer");
    if(row){
        row.remove();
    }
    let tr = document.createElement("tr");
    x.map(function(el){
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        tr.appendChild(td);
        td.appendChild(text);
        table.appendChild(tr);
    })
}
function store(){
    localStorage.setItem("record",table.innerHTML);
}
let rate = data.rates;
for(x in rate){
    calc(from,x,rate[x]);
    calc(to,x,rate[x]);
}

btn.addEventListener("submit",function(e){
    e.preventDefault();
    let i = input.value;
    let f = from.value;
    let t = to.value;
    let fromText = i+" "+from.options[from.selectedIndex].innerText;   
    let totext = to.options[to.selectedIndex].innerText;
    let d = new Date().toLocaleString();
    let first = i * f;
    console.log(first);

    let second  = first/t;
    let r = second.toFixed(2)
    result.innerHTML = r;
    console.log(r);

    input.value="";
    input.focus();
    from.value="";
    to.value="1";

    let arr =[d,fromText,totext,r];
    addtotr(arr);
    store();
});

(function(){
    if(localStorage.getItem("record")){
        table.innerHTML = localStorage.getItem("record");
    }else{
        table.innerHTML = `<tr id="rowspacer" ><td>-</td><td>-</td><td>-</td><td>-</td></tr>`
    }
})();

function modechange(){
    document.body.classList.toggle("night-mode");
    document.getElementById("mode-icon").innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-low" viewBox="0 0 16 16">
    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm.5-9.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707zm-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707zm7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707zM3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707z"/>
  </svg>`
}

function clearbtn(){
    localStorage.clear();
    table.innerHTML=  `<tr id="rowspacer" ><td>-</td><td>-</td><td>-</td><td>-</td></tr>`;
    result.innerText="00.0";
};