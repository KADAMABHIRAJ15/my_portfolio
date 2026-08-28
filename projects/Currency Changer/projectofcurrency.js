const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdown){
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newoption.selected = "selected";
        }
        else if(select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption); 
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateflag=(element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc =`https://flagsapi.com/${countrycode}/flat/64.png`;
    let  img = element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }
    //console.log(fromCurr.value.toLowerCase(),toCurr.value.toLowerCase());
    //const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let responce = await fetch(URL);
    let data = await responce.json();
    //let rate = data[toCurr.value.toLowerCase()];
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtval * rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
