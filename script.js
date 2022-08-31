// result screen and buttons object
const calculationProcessTab = document.querySelector("#calculationProcessTab");
const resultTab = document.querySelector("#resultTab");
const numberButtons = document.querySelectorAll(".buttonNumber");
const operatorButtons = document.querySelectorAll(".buttonOperator");
const equalityButton = document.querySelector("#buttonEqual");
const clearButton = document.querySelector("#buttonC");
const clearAllButton = document.querySelector("#buttonAC");

let numberArr = [];
let calculationProcessTabArr = [];
let currentOperator = "";
let isNumber = false;

// buttons event listeners

numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", () => {
        
        // check if it is after operator
        if (!(resultTab.innerHTML === "")) {
            resetCurrentEntry();
        }
      
        isNumber = true;

        // do not let "01, 02..."
        if (resultTab.innerHTML != "0") {
            calculationProcessTab.innerHTML += numberButton.value;
            resultTab.innerHTML += numberButton.value;
        }  

    })
})

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {

            isNumber = false; // turn on operator process     
            currentOperator = operatorButton.value;

            if (calculationProcessTabArr.length > 0) {

                let arrayLastElement = calculationProcessTabArr.slice(-1); // last operator

                // prevent to add more than one operators in a row
                if (checkLastElement(arrayLastElement) && (resultTab.innerHTML == "")) {
                    
                    // edit array
                    calculationProcessTabArr.pop();
                    calculationProcessTabArr.push(currentOperator);
                    
                    // edit tabs
                    calculationProcessTab.innerHTML = calculationProcessTab.innerHTML.substring(0, calculationProcessTab.innerHTML.length - 1);
                    calculationProcessTab.innerHTML += currentOperator;
                    resultTab.innerHTML = "";

                // perform usual calculation order
                } else if (checkLastElement(arrayLastElement) && !(resultTab.innerHTML == "")) {
                
                    // edit array
                    calculationProcessTabArr.push(resultTab.innerHTML);
                    calculationProcessTabArr.push(currentOperator);

                    // edit tabs
                    calculationProcessTab.innerHTML += currentOperator;
                    resultTab.innerHTML = "";
                }

            // the first calculation
            } else {

                // number + operator
                if (resultTab.innerHTML != "") {
                    calculationProcessTabArr.push(resultTab.innerHTML);
                }
                calculationProcessTabArr.push(currentOperator);

                // 0 + operator
                if (calculationProcessTab.innerHTML == "") {
                    calculationProcessTab.innerHTML += resultTab.innerHTML;
                }     
                calculationProcessTab.innerHTML += currentOperator;

                resultTab.innerHTML = "";
            }
     
            addNumbertoCalculationProcessTabArr();
            console.log(calculationProcessTabArr)

    })
})

clearButton.addEventListener("click", clearLastNumber);
clearAllButton.addEventListener("click",clearAllNumber);

// functions
function resetCurrentEntry() {
    
    if (!isNumber) {
        resultTab.innerHTML = "";
    }

}

function addNumbertoCalculationProcessTabArr() {

    numberArr.push(parseInt(resultTab.innerHTML));

}

function checkLastElement(string) {

    if ((string == '+') || (string == '-') || (string == '*') || (string == '/')) {
        return true;
    }

}

function clearLastNumber() {

    resultTab.innerHTML = resultTab.innerHTML.substring(0, resultTab.innerHTML.length - 1);
    calculationProcessTab.innerHTML = calculationProcessTab.innerHTML.substring(0, calculationProcessTab.innerHTML.length - 1);

}

function clearAllNumber() {
    
    resultTab.innerHTML = "0";
    calculationProcessTab.innerHTML = "";
    calculationProcessTabArr = [];

}

function calculateProcess(operator) {
    
    let formerNumber = numberArr[(numberArr.length) - 1];
    let currentNumber = numberArr[(numberArr.length) - 2];

    if (operator === "+") {
        resultTab.innerHTML = formerNumber + currentNumber;
    } else if (operator === "-") {
        resultTab.innerHTML = formerNumber - currentNumber;
    } else if (operator === "/") {
        resultTab.innerHTML = formerNumber / currentNumber;
    } else if (operator === "*") {
        resultTab.innerHTML = formerNumber * currentNumber;
    }

}


