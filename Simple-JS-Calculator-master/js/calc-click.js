const keys = document.querySelectorAll('#calculator span');
const operators = ['+', '-', '*', '/'];
let hasDecimal = false;

// Add an event listener to each key.
keys.forEach(key => key.addEventListener("click", calculate));

function calculate(e) {
    const { innerHTML: key } = e.target;
    const result = document.querySelector('#result');
    const input = result.innerHTML;

    // If clear key is pressed, empty the result.
    if (key === 'C') {
        result.innerHTML = '';
        hasDecimal = false;
    }
    // If equals key is pressed, calculate and show the result.
    else if (key === '=') {
        let equation = input;
        const lastChar = equation[equation.length - 1];

        // Remove if the last character is an operator or a decimal.
        if (operators.includes(lastChar) || lastChar === '.') {
            equation = equation.replace(/.$/, '');
        }

        if (equation) {
            try {
                // Safer evaluation method
                result.innerHTML = new Function('return ' + equation)();
            } catch (error) {
                result.innerHTML = 'Error';
            }
        }
        hasDecimal = false;
    }
    // Handle operators
    else if (operators.includes(key)) {
        const lastChar = input[input.length - 1];

        if (input !== '' && !operators.includes(lastChar))
            result.innerHTML += key;

        if (input === '' && key === '-')
            result.innerHTML += key;

        if (operators.includes(lastChar) && input.length > 1)
            result.innerHTML = input.replace(/.$/, key);
        hasDecimal = false;
    }
    // Handle decimal point
    else if (key === '.') {
        if (!hasDecimal) {
            result.innerHTML += key;
            hasDecimal = true;
        }
    }
    // Prevent multiple zeros at the start
    else if (input === '' && key === '0') {
        result.innerHTML = '';
    }
    // If any other key, just append it
    else {
        result.innerHTML += key;
    }

    // Prevent page from jumping
    e.preventDefault();
}
