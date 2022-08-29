// result screen and buttons object
const calculationHistory = document.querySelector("#calculationHistory");
const currentEntry = document.querySelector("#currentEntry");
const numberButtons = document.querySelectorAll(".buttonNumber");
const operatorButtons = document.querySelectorAll(".buttonOperator")

let numberArr = [];
let isNumber = false;

// buttons event listeners
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", () => {
        
        // check if it is after operator
        if (!(currentEntry.innerHTML === "")) {
            resetCurrentEntry(numberButton);
        }
      
        isNumber = true;

        calculationHistory.innerHTML += numberButton.value;
        currentEntry.innerHTML += numberButton.value;

    })
})

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {

        isNumber = false;
        calculationHistory.innerHTML += " " + operatorButton.value + " ";
        addNumbertoArr();
        resetCurrentEntry(operatorButton);
        currentEntry.innerHTML = operatorButton.value;

    })
})

function addNumbertoArr() {

    numberArr.push(parseInt(currentEntry.innerHTML));
    console.log(numberArr);
}

function calculateProcess(formerNumber, currentNumber, operator) {

}

function resetCurrentEntry(button) {
    
    if (!isNumber) {
        currentEntry.innerHTML = "";
    }


}




