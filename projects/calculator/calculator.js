const display = document.querySelector("#display");
console.log(display)
const buttons = document.querySelectorAll(".buttons");
console.log(buttons)

buttons.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        console.log("clicked...!")
        const value = btn.innerText;
        switch(value){
            case "=":
                try{
                    display.value = eval(display.value);
                }catch{
                    display.value="error";
                }
                break;

            case "AC":
                display.value = "";
                break;

            case "<":
                display.value = display.value.slice(0,-1);
                break;
            
            default :
                display.value += value;
        }
    })
})