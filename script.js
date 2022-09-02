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
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", () => {

        // check if it is after operator or initial entry
        // check also if it's 0.,, float point
        if (!(currentNumberTab.innerHTML === "") && (currentNumberTab.innerHTML != "0.")) {
            resetCurrentEntry();
        } 

        isNumber = true; // turn on number

        // do not let "01, 02..."
        if (currentNumberTab.innerHTML != "0") {
            currentNumberTab.innerHTML += numberButton.value;
        }

    })
})

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {

        isNumber = false; // turn on operator process     

        // after first calculation
        if (calculationProcessTabArr.length > 0) {

            let isLastElementOperator = calculationProcessTabArr.slice(-1);

            // prevent to add more than one operator in a row
            if (checkLastElement(isLastElementOperator) && (currentNumberTab.innerHTML == "")) {

                // edit array
                calculationProcessTabArr.pop();
                calculationProcessTabArr.push(operatorButton.value);

                // edit tabs
                calculationProcessTab.innerHTML = "";
                calculationProcessTab.innerHTML += calculationProcessTabArr[0] + " " + operatorButton.value + " ";
                currentNumberTab.innerHTML = "";



            }
            // perform usual calculation order
            else if (checkLastElement(isLastElementOperator) && !(currentNumberTab.innerHTML == "")) {

                performCalculationProcess();

                calculationProcessTabArr.push(operatorButton.value);
                calculationProcessTab.innerHTML += operatorButton.value + " ";

            }
            // perform calculation while numbers are available in tabs without operator
            else if (!checkLastElement(isLastElementOperator) && !(currentNumberTab.innerHTML == "")) {

                // edit array
                calculationProcessTabArr.push(operatorButton.value);

                performCalculationProcess();

            }
            // continue to calculation after using equality button
            else if (!checkLastElement(isLastElementOperator) && (currentNumberTab.innerHTML == "")) {

                calculationProcessTabArr.push(operatorButton.value);
                calculationProcessTab.innerHTML += operatorButton.value + " ";

            }

            // the first calculation
        } else {

            // edit array
            calculationProcessTabArr.push(currentNumberTab.innerHTML);
            calculationProcessTabArr.push(operatorButton.value);

            // edit tabs
            calculationProcessTab.innerHTML += currentNumberTab.innerHTML + " " + operatorButton.value + " ";
            currentNumberTab.innerHTML = "";

        }

        console.log(calculationProcessTabArr)

    })
})

equalityButton.addEventListener("click", () => {

    isNumber = false; // turn on operator process 

    if (calculationProcessTabArr.length > 0) {
        performCalculationProcess();
    }

});

clearButton.addEventListener("click", clearLastNumber);
clearAllButton.addEventListener("click", clearAllNumber);
decimalPointButton.addEventListener("click", addDecimalPoint);

// -----------------------------------------------------------------------------------
// functions
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

        if (operator === "+") {
            currentNumberTab.innerHTML = (firstNumber + secondNumber). toFixed(3);
        } else if (operator === "-") {
            currentNumberTab.innerHTML = (firstNumber - secondNumber). toFixed(3);
        } else if (operator === "/") {
            currentNumberTab.innerHTML = (firstNumber / secondNumber). toFixed(3);
        } else if (operator === "*") {
            currentNumberTab.innerHTML = (firstNumber * secondNumber). toFixed(3);
        } else if (operator === "%") {
            currentNumberTab.innerHTML = (firstNumber % secondNumber). toFixed(3);
        }

        calculationProcessTab.innerHTML = deleteTrailingZeros(currentNumberTab.innerHTML) + " ";
        calculationProcessTabArr = [];
        calculationProcessTabArr.push(currentNumberTab.innerHTML);

        console.log(calculationProcessTabArr);

    }

    // clear currentNumberTab after calculation
    resetCurrentEntry();

}

function addDecimalPoint() {

    // do no let using decimal point more than once
    if (!(currentNumberTab.innerHTML.includes('.'))) {
        currentNumberTab.innerHTML = `${currentNumberTab.innerHTML}.`;
    }
    
}

function deleteTrailingZeros(number) {

    let temp = parseFloat(number);

    while (temp % 10 === 0) {
        temp /= 10;
    }

    return temp;

}

// ondalık sonrası 3-4 rakam
// 0'a bölme
// tuş ekleme
// currententry boşken . girmek




