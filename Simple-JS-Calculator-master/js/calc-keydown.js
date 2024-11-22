document.addEventListener("DOMContentLoaded", function () {
  const result = document.getElementById("result");
  const keys = document.querySelectorAll("#calculator button");
  const toggleButton = document.getElementById("toggleMode");

  let currentInput = '0';

  function updateResult(value) {
      currentInput = value;
      result.innerHTML = value;
  }

  function handleButtonClick(e) {
      // Prevent the toggle button from being processed by the calculator
      if (e.target === toggleButton) return;

      const key = e.target.innerHTML;

      if (key === 'C') {
          updateResult('0');
      } else if (key === '=') {
          try {
              updateResult(eval(currentInput)); // Use a safer eval approach if possible
          } catch (err) {
              updateResult('Error');
          }
      } else {
          if (currentInput === '0') {
              updateResult(key);
          } else {
              updateResult(currentInput + key);
          }
      }
  }

  keys.forEach(key => {
      key.addEventListener('click', handleButtonClick);
  });

  document.addEventListener("keydown", function (e) {
      if (e.key >= '0' && e.key <= '9') {
          updateResult(currentInput === '0' ? e.key : currentInput + e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
          updateResult(currentInput + e.key);
      } else if (e.key === 'Enter') {
          try {
              updateResult(eval(currentInput)); // Evaluate when Enter is pressed
          } catch (err) {
              updateResult('Error');
          }
      } else if (e.key === 'Backspace') {
          updateResult(currentInput.slice(0, -1) || '0');
      }
  });
});
