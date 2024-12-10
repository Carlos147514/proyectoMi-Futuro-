const toggleButton = document.getElementById('toggle');
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            toggleButton.textContent = document.body.classList.contains('dark-mode') ? '☼' : '☽';
        });