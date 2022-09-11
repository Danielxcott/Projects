const answer = ["B","A","A","B"];
const form = document.querySelector(".form-container");
const result = document.querySelector(".result");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const userAnswer = [form.q1.value,form.q2.value,form.q3.value,form.q4.value];
    let score = 0;
    userAnswer.forEach((value,index)=>{
        if(value == answer[index]){
            score += 25;
        }
    });
    scrollTo(0,0)
    
    result.classList.remove("d-none");

    let output = 0;
    let timer = setInterval(()=>{
        result.querySelector("span").textContent = `${output}%`;
        if(output === score)
        {
            clearInterval(timer);
        }else{
            output++;
        }
    },10)
})