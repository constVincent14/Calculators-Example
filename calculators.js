let toScreen = "0"; // string, karena akan ditempatkan di .screen
let runningTotal = 0;
let lastOperator = null; //undefined, karena akan diganti oleh operator matematika!
const mainScreen = document.querySelector('.screen');
function klikTombol(value) {
    if (isNaN(parseInt(value))) {
        goToSymbol(value);
    } else {
        goToNumber(value);
    };
    dispToScreen();
    console.log(value)
};
function goToSymbol(value) {
    switch (value) {
        case "C":
            toScreen = "0";
            runningTotal = 0;
            lastOperator = null;
            break;
        case "=":
            if (lastOperator === null) {
                return; // skip all the rest of the rows
            };
            lakukanOperasi(parseInt(toScreen));
            lastOperator = null;
            toScreen = "" + runningTotal; //change runningTotal into string!
            runningTotal = 0;
            break;
        case "del":
            if (toScreen.length === 1) {
                toScreen = 0;
            } else {
                toScreen = toScreen.substring(0, toScreen.length-1)
            }
            break;
        default:
            goToOperator(value);
            break;
    };  
};
function lakukanOperasi(intToScreen) {
    if (lastOperator === "+") {
        runningTotal += intToScreen;
    } else if (lastOperator === "-") {
        runningTotal -= intToScreen;
    } else if (lastOperator === "/") {
        runningTotal /= intToScreen;
    } else if (lastOperator === "*") {
        runningTotal *= intToScreen;
    } else {
        runningTotal = 0;
        toScreen = "0";
        lastOperator = null;
    }
};
function goToOperator(value) {
    const intToScreen = parseInt(toScreen);
    if (runningTotal === 0) {
        runningTotal = intToScreen;
    } else {
        lakukanOperasi(intToScreen)
    };
    lastOperator = value;
    toScreen = "0"; // set 0 agar tidak bermasalah ketika membaca input ke-2 nanti
}
function goToNumber(value) {
    if (toScreen === "0") {
        toScreen = value;
    } else {
        toScreen += value; // appending number, karena string maka tidak terjadi penjumlahan Int!
    }
};
function dispToScreen() {
    mainScreen.innerText = toScreen;
}
document.querySelector(".all-buttons").addEventListener("click", function(event) {
    klikTombol(event.target.innerText);
}); // main-program!