// JavaScript for toggling dark mode
document.getElementById('toggleMode').addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    // Ensure the result screen text remains as '0' when toggling modes
    const result = document.getElementById('result');
    if (result.innerText === "") {
        result.innerText = "0"; // Reset to '0' if the result screen is empty
    }
});
