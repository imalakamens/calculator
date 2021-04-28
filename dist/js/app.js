class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  //calculator does things! functions/methods below...
  //clear
  clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  //delete one number off the end of display
  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  //equals
  appendNumber(number){
    // need to check for an existing period in our number because more than one is bad!
    if(number === '.' && this.currentOperand.includes('.')) return;
    // type conversion so as to not add/literally perform operation on these but instead to update the display
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  //add operation to...operand!
  chooseOperation(operation){
    // to make sure there's something there before trying to get an operand! fail first...
    if(this.currentOperand === '') return 
    // check if previous operand exists, and do the operation!
    if(this.previousOperand !== '') {
      this.compute();
    }
    //get the operation!
    this.operation = operation;
    // update the prev. operand to be the current one - then clear the current operand!
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute(){
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return; 
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break
      case '-':
        computation = prev - current;
        break
      case '*':
        computation = prev * current;
        break
      case '÷':
        computation = prev / current;
        break
      default:
        return
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay(){
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if(this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

/* constants */
/* cached element references */
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    // every time a button is clicked append the number on the clicked button to the current number!
    calculator.appendNumber(button.innerText);
    // after state changes, update it with a render like function!
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})
/* app's state (variables) */
// the numbers object can hold the state values of the current, previous, and sum Numbers
/* event listeners */
/* functions */
