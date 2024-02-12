let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

class CashRegister {
  constructor(value, remainingValues) {
    this.value = value;
    this.remainingValues = remainingValues;
    this.totalCash = cid
      .map((value) => value[1])
      .reduce((a, b) => a + b)
      .toFixed(2);

    this.amount = {
      "ONE HUNDRED": 100,
      TWENTY: 20,
      TEN: 10,
      FIVE: 5,
      ONE: 1,
      QUARTER: 0.25,
      DIME: 0.1,
      NICKEL: 0.05,
      PENNY: 0.01,
    };
    console.log("Total cash: " + this.totalCash);
  }

  calculation() {
    let changeObject = {};
    let changeDue = this.remainingValues;
    changeDue = changeDue.toFixed(2);

    if (this.totalCash < this.remainingValues) {
      return "INSUFFICIENT_FUNDS";
    } else if (this.totalCash === changeDue) {
      return `CLOSED PENNY: $${this.totalCash}`;
    } else {
      for (let i = cid.length - 1; i >= 0; i--) {
        let denomination = cid[i][0];
        let amount = cid[i][1];
        console.log("Remaining due: " + changeDue);
        console.log(denomination + " : " + amount);

        let denominationValue = this.amount[denomination];
        console.log("Denomination value: " + denominationValue);

        if (denominationValue <= changeDue && amount > 0) {
          let maxAmountToUse = Math.min(
            Math.floor(amount / denominationValue),
            Math.floor(changeDue / denominationValue)
          );
          console.log("Max value to be multiplied: " + maxAmountToUse);
          let amountToUse = maxAmountToUse * denominationValue;
          console.log("Amount to be used: " + amountToUse);
          changeObject[denomination] = amountToUse;
          changeDue -= amountToUse;
          changeDue = Number.isInteger(changeDue)
            ? changeDue
            : changeDue.toFixed(2);
          cid[i][1] -= amountToUse;
        }
      }

      console.log("Final change due: " + changeDue);
      if (changeDue === 0) {
        let changeString = Object.entries(changeObject)
          .map(([denomination, amount]) => `${denomination}: $${amount}`)
          .join("<br />");
        return `OPEN <br>${changeString}`;
      } else {
        return "INSUFFICIENT_FUNDS";
      }
    }
  }
}

const cash = document.getElementById("cash");
const checkBtn = document.getElementById("purchase-btn");
const div = document.getElementById("change-due");
const remainingCash = document.getElementById("remaining-cash");
const priceOutput = document.getElementById("price");

let output = "<strong>Change in drawer:</strong> <br><br>";

for (const [denomination, amount] of cid) {
  output += denomination + ": $" + amount.toFixed(2) + "<br>";
}

remainingCash.innerHTML = output;

priceOutput.innerText = `Price: ${price}`;

checkBtn.addEventListener("click", () => {
  if (price > cash.value) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash.value == price) {
    div.textContent = "No change due - customer paid with exact cash";
  } else {
    const resultValue = new CashRegister(
      cash.value,
      parseFloat(cash.value) - price
    );
    div.innerHTML = `Status: ${resultValue.calculation()}`;
    console.log(div.textContent);
  }
});
