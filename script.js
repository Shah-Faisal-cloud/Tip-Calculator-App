// The Page is devided into three sections:
// Section 1: Acessing the HTML elements
// Section 2: Adding event listeners to the elements
// Section 3: Functions to handle validations, calculations, and reset


// Section 1: Acessing the HTML elements
const bill = document.getElementById("bill");
const buttons = document.querySelectorAll(".button");
const customTip = document.getElementById("custom");
const NumOfPeople = document.getElementById("people");
const errorBill = document.getElementById("error-bill");
const errorPeople = document.getElementById("error-people");
const tipDisplay = document.getElementById("tip-amount");
const billDisplay = document.getElementById("total-bill");
const resetBtn = document.getElementById("reset-btn");

// Section 2: Adding event listeners to the elements
["input", "blur"].forEach(event => {
    bill.addEventListener(event, () => {
        if (isValid()) calculateTip();
    });
    NumOfPeople.addEventListener(event, () => {
        if (isValid()) calculateTip();
    });
});

customTip.addEventListener("focus", clearTipSelection);
customTip.addEventListener("input", handleCustomTip);
customTip.addEventListener("blur", handleCustomTip);

resetBtn.addEventListener("click", reset);

let tipPercent = 0;

// Section 3: Functions to handle validation, calculation, and reset
function handleValidation(input) {
    
    let value = input === bill ? parseFloat(input.value) : parseInt(input.value)
    
    if (input.value === "") {
        showError("Can't be empty", input);
        return false;
    }
    
    if (value === 0) {
        showError("Can't be zero", input);
        return false;
    } else if (value < 0) {
        showError("Can't be negative", input);
        return false;
    } else {
        hideError(input);
        return true;
    };
};

function showError(msg, input) {
    const error = input === bill ? errorBill : errorPeople;
    error.textContent = msg;
    error.classList.remove("hidden");
    input.classList.add("error");
};

function hideError(input) {
    const error = input === bill ? errorBill : errorPeople;
    error.classList.add("hidden");
    input.classList.remove("error");
};

function clearTipSelection() {
    buttons.forEach(b => b.classList.remove("bg-green-400"));
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        clearTipSelection();
        tipPercent = parseInt(button.textContent);
        button.classList.add("bg-green-400");
        customTip.value = "";
    });
});

function handleCustomTip() {
    const customTipValue = parseFloat(customTip.value);
    if (customTipValue < 0) {
        customTip.classList.add("error");
        return;
    } else {
        customTip.classList.remove("error");
        tipPercent = customTipValue;
        clearTipSelection();
        calculateTip();
    };
};

function calculateTip() {
    const billAmount = parseFloat(bill.value);
    const peopleCount = parseInt(NumOfPeople.value);
    const tipValue = parseFloat(tipPercent);

    if (isNaN(billAmount) || isNaN(peopleCount) || isNaN(tipValue)) return;

    const totalTip = (billAmount * tipValue) / 100;
    const tipPerPerson = totalTip / peopleCount;
    const totalPerPerson = (billAmount + totalTip) / peopleCount;

    tipDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    billDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
};

function isValid() {
    return handleValidation(bill) && handleValidation(NumOfPeople);
}

function reset() {
    bill.value = "";
    clearTipSelection();
    tipPercent = 0;
    NumOfPeople.value = "";
    tipDisplay.textContent = "$0.00";
    billDisplay.textContent = "$0.00";
};
