//creo la classe calculator dove definisco un costrutture passandogli due parametri, inoltre definisco tutte le mie possibili funzioni
class Calculator {

    constructor(previusOperandTextElement, currentOperandTextElement){
        this.previusOperandTextElement = previusOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
     this.currentOperand = '';
     this.previusOperand = '';
     this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previusOperand !== ''){
            this.compute();
        }
        this.operation = operation
        this.previusOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previusOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                 break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break; 
            default:
                return;               
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previusOperand = '';
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigist = stringNumber.split('.')[1];
        let   integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = '';
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigist != null){
            return `${integerDisplay}.${decimalDigist}`
        }else{
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previusOperandTextElement.innerText = `${this.getDisplayNumber(this.previusOperand)} ${this.operation}`
        }else{
            this.previusOperandTextElement.innerText = '';
        }
        
    }
}


// inserisco in delle variabili gli elementi della mia pagina html usanndo querySelectorAll
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previusOperandTextElement = document.querySelector('[data-previus-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// creo un nuovo oggetto calculator
const calculator = new Calculator(previusOperandTextElement, currentOperandTextElement);

//seleziono tutti i pulsanti che contengono i numeri. al click verrà mostrato il testo del pulsante
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// seleziono tutte le operazioni. al click verrà mostrato il testo dell'operazione
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click',  () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',  () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',  () => {
    calculator.delete()
    calculator.updateDisplay()
})