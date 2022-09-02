// result screen and buttons object
const calculationProcessTab = document.querySelector("#calculationProcessTab");
const currentNumberTab = document.querySelector("#currentNumberTab");
const numberButtons = document.querySelectorAll(".buttonNumber");
const operatorButtons = document.querySelectorAll(".buttonOperator");
const equalityButton = document.querySelector("#buttonEqual");
const clearButton = document.querySelector("#buttonC");
const clearAllButton = document.querySelector("#buttonAC");
const decimalPointButton = document.querySelector("#buttonDecimalPoint");

// global variables
let calculationProcessTabArr = [];
let isNumber = false;

// -----------------------------------------------------------------------------------
// buttons event listeners
window.addEventListener("keydown", handleKeyboardInputs);

numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", () => addNumber(numberButton.value))
})

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => addOperator(operatorButton.value))
})

equalityButton.addEventListener("click", () => evaluate);
clearButton.addEventListener("click", clearLastNumber);
clearAllButton.addEventListener("click", clearAllNumber);
decimalPointButton.addEventListener("click", addDecimalPoint);

// -----------------------------------------------------------------------------------
// functions
function addNumber(number) {
    
        // check if it is after operator or initial entry
        // check also if it's 0.,, float point
        if (!(currentNumberTab.innerHTML === "") && (currentNumberTab.innerHTML != "0.")) {
            resetCurrentEntry();
        } 

        isNumber = true; // turn on number

        // do not let "01, 02..."
        if (currentNumberTab.innerHTML != "0")  {

            currentNumberTab.innerHTML += number;

        // do not let to crash app when press "0" while 0 is at currentNumberTab
        } else if (currentNumberTab.innerHTML == "0") {

            currentNumberTab.innerHTML = "";
            currentNumberTab.innerHTML += number;

        }
        
}

function addOperator(operator) {

    isNumber = false; // turn on operator process     

    // after first calculation
    if (calculationProcessTabArr.length > 0) {

        let isLastElementOperator = calculationProcessTabArr.slice(-1);

        // prevent to add more than one operator in a row
        if (checkLastElement(isLastElementOperator) && (currentNumberTab.innerHTML == "")) {

            // edit array
            calculationProcessTabArr.pop();
            calculationProcessTabArr.push(operator);

            // edit tabs
            calculationProcessTab.innerHTML = "";
            calculationProcessTab.innerHTML += calculationProcessTabArr[0] + " " + operator + " ";
            currentNumberTab.innerHTML = "";

        }
        // perform usual calculation order
        else if (checkLastElement(isLastElementOperator) && !(currentNumberTab.innerHTML == "")) {

            performCalculationProcess();

            calculationProcessTabArr.push(operator);
            calculationProcessTab.innerHTML += operator + " ";

        }
        // perform calculation while numbers are available in tabs without operator
        else if (!checkLastElement(isLastElementOperator) && !(currentNumberTab.innerHTML == "")) {

            // edit array
            calculationProcessTabArr.push(operator);

            performCalculationProcess();

        }
        // continue to calculation after using equality button
        else if (!checkLastElement(isLastElementOperator) && (currentNumberTab.innerHTML == "")) {

            calculationProcessTabArr.push(operator);
            calculationProcessTab.innerHTML += operator + " ";

        }

        // the first calculation
    } else {

        // edit array
        calculationProcessTabArr.push(currentNumberTab.innerHTML);
        calculationProcessTabArr.push(operator);

        // edit tabs
        calculationProcessTab.innerHTML += currentNumberTab.innerHTML + " " + operator + " ";
        currentNumberTab.innerHTML = "";

    }

}

function evaluate() {

    isNumber = false; // turn on operator process 

    if (calculationProcessTabArr.length > 0) {
        performCalculationProcess();
    }

}

function resetCurrentEntry() {

    if (!isNumber) {
        currentNumberTab.innerHTML = "";
    }

}

function checkLastElement(string) {

    if ((string == '+') || (string == '-') || (string == '*') || (string == '/') || (string == '%')) {
        return true;
    }

}

function clearLastNumber() {

    currentNumberTab.innerHTML = currentNumberTab.innerHTML.substring(0, currentNumberTab.innerHTML.length - 1);

    if (currentNumberTab.innerHTML == "") {
        currentNumberTab.innerHTML = "0";
    }

}

function clearAllNumber() {

    currentNumberTab.innerHTML = "0";
    calculationProcessTab.innerHTML = "";
    calculationProcessTabArr = [];

}

function performCalculationProcess() {

    // check if number exists in entry tab
    if (currentNumberTab.innerHTML != "") {

        let firstNumber = parseFloat(calculationProcessTabArr[0]);
        let secondNumber = parseFloat(currentNumberTab.innerHTML);
        let operator = calculationProcessTabArr[1];
        let isDivideByZero = false;

        if (operator === "+") {
            currentNumberTab.innerHTML = (firstNumber + secondNumber). toFixed(3);
        } else if (operator === "-") {
            currentNumberTab.innerHTML = (firstNumber - secondNumber). toFixed(3);
        } else if (operator === "/") {

            // do not let to divide by zero
            if (secondNumber === 0) {
                alert("You can't divide by zero!");
                isDivideByZero = true;
            } else {
                currentNumberTab.innerHTML = (firstNumber / secondNumber). toFixed(3);
            }
            
        } else if (operator === "*") {
            currentNumberTab.innerHTML = (firstNumber * secondNumber). toFixed(3);
        } else if (operator === "%") {
            currentNumberTab.innerHTML = (firstNumber % secondNumber). toFixed(3);
        }

        if (!isDivideByZero) {
            calculationProcessTab.innerHTML = deleteTrailingZeros(currentNumberTab.innerHTML) + " ";
            calculationProcessTabArr = [];
            calculationProcessTabArr.push(deleteTrailingZeros(currentNumberTab.innerHTML));
        }
        
    }

    // clear currentNumberTab after calculation
    resetCurrentEntry();

}

function addDecimalPoint() {

    // if there is no number entry
    if (currentNumberTab.innerHTML === "") {
        currentNumberTab.innerHTML = "0.";
    }

    // do no let using decimal point more than once
    if (!(currentNumberTab.innerHTML.includes('.'))) {
        currentNumberTab.innerHTML = `${currentNumberTab.innerHTML}.`;
    }
  
}

function deleteTrailingZeros(number) {

    let temp = parseFloat(number);

    // do not let to delete zeros before dot! (temp > parseInt(number))
    while ((temp % 10 === 0) && (temp > parseInt(number))) {
        temp /= 10;
    }

    return temp;

}

function handleKeyboardInputs(e) {

    if (e.key === "Backspace") clearLastNumber();
    if (e.key === "Delete" || e.key === "Escape") clearAllNumber();       
    if(e.key === "," || e.key === ".") addDecimalPoint();
    if (e.key >= 0 && e.key <= 9) addNumber(e.key);
    if (e.key === "+" || e.key === "-" || e.key === "*" 
    || e.key === "/" || (e.key === "%" && e.shiftKey === true) ) addOperator(e.key);
    if (e.key === "Enter") evaluate();

}

