// Calculator
// Uses global functions since innerHTML scripts don't execute
let calcCurrent = "0";
let calcPrevious = null;
let calcOperator = null;
let calcResetNext = false;

function updateCalcDisplay() {
  const display = document.getElementById("calc-display");
  if (display) {
    let text = calcCurrent;
    const num = parseFloat(text);
    if (!isNaN(num) && text.length > 12) text = num.toExponential(6);
    display.textContent = text;
  }
}

function calcOp(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "−": return a - b;
    case "×": return a * b;
    case "÷": return b !== 0 ? a / b : "Error";
    default: return b;
  }
}

window.calcInput = function (val) {
  if (val >= "0" && val <= "9") {
    if (calcResetNext || calcCurrent === "0") {
      calcCurrent = val;
      calcResetNext = false;
    } else {
      calcCurrent += val;
    }
  } else if (val === ".") {
    if (calcResetNext) { calcCurrent = "0"; calcResetNext = false; }
    if (!calcCurrent.includes(".")) calcCurrent += ".";
  } else if (val === "C") {
    calcCurrent = "0"; calcPrevious = null; calcOperator = null; calcResetNext = false;
  } else if (val === "±") {
    calcCurrent = String(-parseFloat(calcCurrent));
  } else if (val === "%") {
    calcCurrent = String(parseFloat(calcCurrent) / 100);
  } else if (val === "=") {
    if (calcPrevious !== null && calcOperator) {
      calcCurrent = String(calcOp(parseFloat(calcPrevious), parseFloat(calcCurrent), calcOperator));
      calcPrevious = null; calcOperator = null; calcResetNext = true;
    }
  } else {
    if (calcPrevious !== null && calcOperator && !calcResetNext) {
      calcCurrent = String(calcOp(parseFloat(calcPrevious), parseFloat(calcCurrent), calcOperator));
    }
    calcPrevious = calcCurrent;
    calcOperator = val;
    calcResetNext = true;
  }
  updateCalcDisplay();
};

export const calculatorApp = {
  id: "calculator",
  title: "Calculator",
  icon: "🔢",
  defaultWidth: 220,
  defaultHeight: 310,
  render: () => {
    // Reset state when opening
    calcCurrent = "0";
    calcPrevious = null;
    calcOperator = null;
    calcResetNext = false;

    const buttons = [
      ["C", "±", "%", "÷"],
      ["7", "8", "9", "×"],
      ["4", "5", "6", "−"],
      ["1", "2", "3", "+"],
      ["0", ".", "="],
    ];

    const rows = buttons
      .map((row) =>
        row
          .map((btn) => {
            const isOp = ["÷", "×", "−", "+", "="].includes(btn);
            const isFunc = ["C", "±", "%"].includes(btn);
            const isZero = btn === "0";
            const cls = `calc-btn${isOp ? " calc-op" : ""}${isFunc ? " calc-func" : ""}`;
            const span = isZero ? ' style="grid-column: span 2"' : "";
            return `<button class="${cls}"${span} onclick="calcInput('${btn}')">${btn}</button>`;
          })
          .join("")
      )
      .join("");

    return `
      <div class="app-calculator">
        <div class="calc-display">
          <div class="calc-screen" id="calc-display">0</div>
        </div>
        <div class="calc-buttons">
          ${rows}
        </div>
      </div>
    `;
  },
};
