let userScore = 0;
let computerScore = 0;

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");

const userscorepara = document.querySelector("#user-score");
const computerscorepara = document.querySelector("#computer-score");

const gencomputerchoice =()=>{
    const options =["rock","paper","scissors"];
    const randidx = Math.floor(Math.random() * 3);
    return options[randidx];
};

const drawgame =()=>{
    msg.innerText=" Game was draw. Play again. ";
    msg.style.backgroundColor="#081b31"
};

const showwinner=(userwin,userchoice,computerchoice)=>{
    if(userwin){
        userScore++;
        userscorepara.innerText = userScore;
        msg.innerText=` You Win. Your ${userchoice} Beats ${computerchoice}. `;
        msg.style.backgroundColor ="green";
    }
    else{
        computerScore++;
        computerscorepara.innerText = computerScore;
        msg.innerText =` You Lose. ${computerchoice} Beats your ${userchoice}. `;
        msg.style.backgroundColor ="red";
    }
    
};

const playgame =(userchoice)=>{
    console.log("user choice =",userchoice)
    const computerchoice = gencomputerchoice();
    console.log("Computer choice =",computerchoice);

    if(userchoice === computerchoice){
        drawgame();
    }
    else{
        let userwin = true;
        if(userchoice === "rock"){
            //scissor,paper
            userwin = computerchoice === "paper" ? false: true;
        }
        else if(userchoice === "paper"){
            //rock,scissor
            userwin = computerchoice === "scissors" ? false: true;
        }
        else{
            //rock,paper
            userwin = computerchoice === "rock" ? false: true; 
        }
        showwinner(userwin,userchoice,computerchoice);
    }
};

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userchoice = choice.getAttribute("id");
        playgame(userchoice);
    });
});
