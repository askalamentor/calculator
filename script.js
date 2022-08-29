// result screen and buttons object
const result = document.querySelectorAll(".subResultContainer");
const buttons = document.querySelectorAll(".button");
console.log(buttons);

// buttons event listener
buttons.forEach((numberButton) => {
    button.addEventListener("click", () => {
        result[0].innerHTML += numberButton.value;
        result[1].innerHTML += numberButton.value;
    })
})



