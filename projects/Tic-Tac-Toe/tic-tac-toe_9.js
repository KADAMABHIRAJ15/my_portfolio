let boxs = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newbtn = document.querySelector("#new");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true;//plyX,plyO
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetgame = () => {
    turnO = true;
    enaabledbtn();
    msgcontainer.classList.add("hide");
}

boxs.forEach((box) => {
    box.addEventListener("click", () => {

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;

        }

        box.disabled = true;

        checkwinner();
    });
});

const disabledbtn = () => {
    for (let box of boxs) {
        box.disabled = true;
    }
}

const enaabledbtn = () => {
    for (let box of boxs) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showwinner = (winner) => {
    msg.innerText = `Congrtaulations,Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledbtn();
}

const checkwinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxs[pattern[0]].innerText;
        let pos2val = boxs[pattern[1]].innerText;
        let pos3val = boxs[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner", pos1val);
                showwinner(pos1val);
            }
        }
    };
};

newbtn.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);
